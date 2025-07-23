import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Ornamen from '../assets/ornamen.svg?react';
import MasonryGallery from './partials/masonry'
import galleries from '../assets/json/galleries.json'

interface ImageItem {
  id: number;
  title: string;
  src: string;
  category: string;
}

const Gallery = () => {

  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    setImages(galleries);
  }, []);


  return (
    <section className="section flex flex-col justify-center items-center w-full fade-in">
      <motion.span
        className="ornamen rotate-180 -mt-30 mt:-mt-20 lg:-mt-10"
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 1.0 }}
      >
        <Ornamen />
      </motion.span>

      <main className="advance-gap">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4 xl:gap-5">
          <motion.h1 
            className="title playwrite-ro" id="gallery"
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          >
            Galeri
          </motion.h1>
          <motion.h2 
            className="subtitle mb-5 text-center w-[75%]"
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          >
            Kumpulan Hasil Makeup & Dekorasi Terbaik Kami
          </motion.h2>
        </div>

        <div className="w-[95%] md:w-[90%]">
          <MasonryGallery images={images} />
        </div>
      </main>

      <motion.span
        className="ornamen -mt-30 mt:-mt-20 lg:-mt-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        <Ornamen />
      </motion.span>
    </section>
  );
};

export default Gallery;
