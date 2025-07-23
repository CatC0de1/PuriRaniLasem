import { motion } from "framer-motion"

function Home() {

  return (
    <section className='section flex flex-col justify-center items-center gap-5 pt-[50%] md:pt-[18%] md:pb-[5%] lg:pt-[20%] lg:pb-[5%] xl:pt-[15%] xl:pb-[1%]' id='home'>
      <motion.h1 
        className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-(--primary-color) playwrite-ro text-center'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Puri RaniLasem
      </motion.h1>
      <motion.h2 
        className='text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-(--secondary-color) text-center'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
      >
        Riasan Cantik untuk Momen Berharga
      </motion.h2>
      <motion.p
        className='text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl w-[80%] md:[60%] text-center pt-5'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
      >
        Pilihan terpercaya untuk layanan makeup profesional, dari gaya adat tradisional hingga modern elegan.
      </motion.p>
    </section>
  )
}

export default Home