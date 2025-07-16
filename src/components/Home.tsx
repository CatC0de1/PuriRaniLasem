function Home() {

  return (
    <section className='section flex flex-col justify-center items-center gap-5 pt-[50%] md:pt-[18%] md:pb-[5%] lg:pt-[20%] lg:pb-[5%] xl:pt-[15%] xl:pb-[1%]' id='home'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-(--primary-color) playwrite-ro text-center fade-in-up'>
        Puri RaniLasem
      </h1>
      <h2 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-(--secondary-color) text-center fade-in-up fade-delay-1'>
        Riasan Cantik untuk Momen Berharga
      </h2>
      <p className='text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl w-[80%] md:[60%] text-center pt-5 fade-in-up fade-delay-2'>
        Pilihan terpercaya untuk layanan makeup profesional, dari gaya adat tradisional hingga modern elegan.
      </p>
    </section>
  )
}

export default Home