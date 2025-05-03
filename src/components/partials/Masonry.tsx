import { useState, useEffect, use } from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageItem {
  id: number;
  title: string;
  src: string;
  category: string;
}

interface MasonryGalleryProps {
  images: ImageItem[];
}

const breakpointColumnsObj = {
  default: 5,
  1024: 4,
  768: 3,
  500: 2,
};

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  
  const filteredImages =
    selectedCategory === 'Semua'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;
  const categories = ['Semua', ...Array.from(new Set(images.map((img) => img.category)))];

  const paginate = (newDirection: number) => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex + newDirection;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setDirection(newDirection);
      setSelectedIndex(newIndex);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === 'Escape') setSelectedIndex(null);
    if (e.key === 'ArrowRight') paginate(1);
    if (e.key === 'ArrowLeft') paginate(-1);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Determine image dimensions to adjust accordingly
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
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
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
      // Portrait: Limit height to the viewport height
      return { maxHeight: '90vh', width: 'auto' };
    } else if (aspectRatio > 1) {
      // Landscape: Limit width to the viewport width
      return { maxWidth: '90vw', height: 'auto' };
    } else {
      // Square: Keep it proportional with 90% of the viewport
      return { maxWidth: '90vw', maxHeight: '90vh' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedIndex(null);
            }}
            className={`bg-[#000] px-3 py-1 rounded-2xl text-sm font-medium transition border-1 md:border-2 ${
              selectedCategory === cat
                ? 'text-[#fae220] border-[#fae220]'
                : 'hover:bg-[#111]'
            }`}
          >
            {cat.charAt(0) + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4"
      >
        {filteredImages.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 cursor-pointer"
            onClick={() => {
              setDirection(0);
              setSelectedIndex(index);
            }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full rounded-lg shadow"
              loading="lazy"
            />
          </motion.div>
        ))}
      </Masonry>

      {/* Modal with Swipe */}
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
                onClick={() => setSelectedIndex(null)}
                className="bg-white rounded-full p-2 shadow hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="space-x-2 flex justify-between w-20">
                {selectedIndex! > 0 ? (
                  <button
                    onClick={() => paginate(-1)}
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
                {selectedIndex! < filteredImages.length - 1 ? (
                  <button
                    onClick={() => paginate(1)}
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
              custom={direction}
              initial={{ x: direction * 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
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
    </div>
  );
}
