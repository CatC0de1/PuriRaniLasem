import { useEffect } from 'react';
// import Masonry from 'masonry-layout';
// import imagesLoaded from 'imagesloaded';
// import '../../styles/masonry.css';

interface MasonryProps {
  images: string[];
}

export default function MasonryGallery({ images }: MasonryProps) {
  useEffect(() => {
  }, []);

  return (
    <ul className='grid grid-cols-4'>
      {images.map((src, idx) => (
        <li key={idx}>
          <img
            src={src}
            alt={`Image ${idx + 1}`}
            // className="w-full h-auto"
            fetchPriority="low"
          />
        </li>
      ))}
    </ul>
  );
}
