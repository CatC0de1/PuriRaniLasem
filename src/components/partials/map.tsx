import map from '../../assets/map.webp'

function Map() {
  return (
    <a 
    href="https://www.google.com/maps/place/PURI+RANI+LASEM/@-7.1262332,111.7562506,17z/data=!3m1!4b1!4m6!3m5!1s0x2e777b80046b5427:0x4ae100ede5d46eb1!8m2!3d-7.1262332!4d111.7562506!16s%2Fg%2F11fn7h004s?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D" 
    target="_blank" rel="noopener noreferrer"
    className="w-full h-auto overflow-hidden">
      <div className="w-full h-auto overflow-hidden shadow-inner border-3 border-(--separator-color) rounded-2xl">
        <img src={map} alt="Lokasi Puri RaniLasem" loading="lazy"
          className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105 active:scale-110"
        />
      </div>
    </a>
  )
}

export default Map