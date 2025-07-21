import Map from './partials/map.tsx'
import Sosmed from './partials/sosmed.tsx'
import Logo from '../assets/logo.webp'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section bg-(--secondary-bg-color) flex flex-col justify-center items-center w-full gap-10 md:pt-20 lg:pt-25 xl:pt-30" id="contact">
      <div className="flex flex-row justify-start items-center w-full gap-10">
        <div className="flex flex-col xl:flex-row justify-between xl:justify-around items-center xl:items-start w-full gap-10 md:gap-10">
          <div className="hidden md:block w-full h-auto lg:hidden xl:block xl:order-last xl:basis-2/5">
            <Map />
          </div>
          <div className="flex flex-col md:flex-row xl:flex-col justify-between items-center md:items-start gap-5 lg:gap-10">
            <h1 className="md:hidden -mb-3 text-lg text-(--primary-color) playwrite-ro font-bold">
              Puri RaniLasem
            </h1>
            <div className="flex flex-row justify-center md:justify-start items-center gap-2 w-full lg:basis-2/3 xl:basis-1/3">
            <img src={Logo} className="self-end w-auto h-18 md:h-28 lg:h-30 border-2 border-(--separator-color) rounded-2xl" alt="Logo Puri RaniLasem" />
              <span className="flex flex-col justify-center items-start gap-2">
                <h1 className="hidden md:block text-base md:text-lg text-(--primary-color) playwrite-ro font-bold">
                  Puri RaniLasem
                </h1>
                <p className="text-xs md:text-base flex flex-row gap-1 text-(--secondary-text-color)">
                  <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg></span>Jawa Timur, Bojonegoro, Kalitidu.
                </p>
                <a href="tel:+6281233183679" className="text-sm md:text-base text-sky-500 flex flex-row items-center gap-1" target="_blank" rel="noopener noreferrer">
                  <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg></span>+62 812 3318 3679
                </a>
              </span>
            </div>
            <div className="w-[95%] md:hidden lg:block lg:w-110 lg:order-last xl:hidden">
              <Map />
            </div>
            <div className="">
              <Sosmed />
            </div>
          </div>
        </div>
      </div>
      <div className="text-[10px] md:text-xs xl:text-sm flex justify-center items-center flex-col border-t-2 border-t-(--separator-color) pt-5 w-full md:flex-row">
        <span className="p-1 md:px-2 xl:px-3">
          copyright &copy; {currentYear} Puri RaniLasem. All rights reserved 
        </span>
        <span className="p-1 md:px-2 xl:px-3 md:border-l-2 md:border-l-(--secondary-text-color)">
          This website is made by InovaWeb.
        </span>
      </div>
    </footer>
  )
}

export default Footer