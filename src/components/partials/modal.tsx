import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface ModalProps {
  selectedImage: {
    src: string;
    title: string;
  } | null;
  onClose: () => void;
  onPaginate: (direction: number) => void;
  canPaginateNext: boolean;
  canPaginatePrev: boolean;
  direction: number;
}

export default function Modal({
  selectedImage,
  onClose,
  onPaginate,
  canPaginateNext,
  canPaginatePrev,
  direction,
}: ModalProps) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  // const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!selectedImage) return;

    const img = new Image();
    img.src = selectedImage.src;
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
  
      switch (event.key) {
        case 'ArrowRight':
          if (canPaginateNext) onPaginate(1);
          break;
        case 'ArrowLeft':
          if (canPaginatePrev) onPaginate(-1);
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, canPaginateNext, canPaginatePrev, onPaginate, onClose]);

  const getImageStyles = (): React.CSSProperties => {
    if (!imageDimensions) return {};

    const { width, height } = imageDimensions;

    const aspectRatio = width / height;

    if (aspectRatio < 1) {
      return { maxHeight: '90vh', width: 'auto', objectFit: 'contain' };
    } else if (aspectRatio > 1) {
      return { maxWidth: '90vw', height: 'auto', objectFit: 'contain' };
    } else {
      return { maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Controls */}
          <div className="absolute top-4 flex justify-between w-full px-6 z-40">
            <button
              onClick={onClose}
              className="bg-(--primary-text-color) rounded-full p-2 hover:bg-(--secondary-text-color) transition"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-(--primary-bg-color)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="space-x-2 flex justify-between w-20">
              {canPaginatePrev ? (
                <button
                  onClick={() => onPaginate(-1)}
                  className="bg-(--primary-text-color) rounded-full p-2 hover:bg-(--secondary-text-color) transition"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5 text-(--primary-bg-color)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              ) : (
                <div className="w-10" />
              )}
              {canPaginateNext ? (
                <button
                  onClick={() => onPaginate(1)}
                  className="bg-(--primary-text-color) rounded-full p-2 hover:bg-(--secondary-text-color) transition"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5 text-(--primary-bg-color)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ) : (
                <div className="w-10" />
              )}
            </div>
          </div>

          {/* Swipeable Image */}
          <motion.div
            key={selectedImage.src}
            className="max-w-4xl w-full px-4 flex justify-center items-center"
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 300 : -300,
                opacity: 0,
              }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({
                x: dir > 0 ? -300 : 300,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold && canPaginateNext) {
                // setDirection(1);
                onPaginate(1);
              } else if (swipe > swipeConfidenceThreshold && canPaginatePrev) {
                // setDirection(-1);
                onPaginate(-1);
              }
            }}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="rounded-lg shadow-lg"
              style={getImageStyles()}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}