import Ornamen from '../assets/ornamen.svg?react';

const Gallery = () => {
  return (
    <section className="section flex flex-col justify-center items-center w-full fade-in">
      <Ornamen className="ornamen rotate-180 -mt-30 mt:-mt-20 lg:-mt-10" />

      <main className="advance-gap">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4 xl:gap-5">
          <h1 className="title playwrite-ro" id="gallery">
            Galeri
          </h1>
          <h2 className="subtitle mb-5 text-center w-[75%]">
            Kumpulan Hasil Makeup & Dekorasi Terbaik Kami
          </h2>
        </div>

        <div className="w-[95%] md:w-[90%]">
          {/* <Masonry images={images} /> */}
        </div>
      </main>

      <Ornamen className="ornamen -mb-30 md:-mb-20 lg:-mb-10" />
    </section>
  );
};

export default Gallery;
