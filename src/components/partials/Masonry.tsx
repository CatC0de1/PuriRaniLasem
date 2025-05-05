import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import Modal from './Modal';

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

      {/* Modal */}
      <Modal
        selectedImage={selectedImage}
        onClose={() => setSelectedIndex(null)}
        onPaginate={paginate}
        canPaginateNext={selectedIndex !== null && selectedIndex < filteredImages.length - 1}
        canPaginatePrev={selectedIndex !== null && selectedIndex > 0}
      />
    </div>
  );
}