import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import Modal from './modal';

interface ImageItem {
  id: number;
  title: string;
  src: string;
  category: string;
}

interface MasonryGalleryProps {
  images: ImageItem[];
}

// menggunakan breakpoint max-width (kebalikan dari tailwindcss)
const breakpointColumnsObj = {
  default: 3,
  2000: 3,
  1279: 3,
  1023: 3,
  767: 3
};

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set()); // Track visible images
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const filteredImages =
    selectedCategory === 'Semua'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const categories = ['Semua', ...Array.from(new Set(images.map((img) => img.category)))];
  const selectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  const paginate = (newDirection: number) => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex + newDirection;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setDirection(newDirection);
      setSelectedIndex(newIndex);
    }
  };

  const observerRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for each image container

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleImages((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredImages]);

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleImages(new Set()); // Reset visible images when category changes
            }}
            className={`bg-[#000] px-3 py-1 rounded-2xl text-sm font-medium transition border-1 md:border-2 ${
              selectedCategory === cat
                ? 'text-[#fae220] border-[#fae220]'
                : 'hover:bg-[#111]'
            }`}
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 1.0 }}
          >
            {cat.charAt(0) + cat.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4 w-auto"
        columnClassName="pl-2 md:pl-2.5 lg:pl-3 xl:pl-4"
      >
        {filteredImages.map((img, index) => (
          <motion.div
            key={img.id}
            ref={(el) => { observerRefs.current[index] = el; }} // Assign ref to each image container
            data-index={index} // Store index for reference
            initial={{ opacity: 0, y: 30 }}
            animate={visibleImages.has(index) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-2 md:mb-2.5 lg:mb-3 xl:mb-4 cursor-pointer"
            onClick={() => {
              setDirection(0);
              setSelectedIndex(index);
            }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full rounded-sm md:rounded-md xl:rounded-lg hover:drop-shadow-[0_0_5px_white] active:drop-shadow-[0_0_4px_#fae220]"
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