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
}

export default function Modal({
  selectedImage,
  onClose,
  onPaginate,
  canPaginateNext,
  canPaginatePrev,
}: ModalProps) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

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

  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const getImageStyles = () => {
    if (!imageDimensions) return {};

    const { width, height } = imageDimensions;

    const aspectRatio = width / height;

    if (aspectRatio < 1) {
      return { maxHeight: '90vh', width: 'auto' };
    } else if (aspectRatio > 1) {
      return { maxWidth: '90vw', height: 'auto' };
    } else {
      return { maxWidth: '90vw', maxHeight: '90vh' };
    }
  };

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
          <div className="absolute top-4 flex justify-between w-full px-6 z-10">
            <button
              onClick={onClose}
              className="bg-white rounded-full p-2 shadow hover:bg-gray-200 transition"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="space-x-2 flex justify-between w-20">
              {canPaginatePrev ? (
                <button
                  onClick={() => onPaginate(-1)}
                  className="bg-white rounded-full p-2 shadow hover:bg-gray-200 transition"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              ) : (
                <div className="w-10" />
              )}
              {canPaginateNext ? (
                <button
                  onClick={() => onPaginate(1)}
                  className="bg-white rounded-full p-2 shadow hover:bg-gray-200 transition"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            initial={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                onPaginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                onPaginate(-1);
              }
            }}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg shadow-lg"
              style={getImageStyles()}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}