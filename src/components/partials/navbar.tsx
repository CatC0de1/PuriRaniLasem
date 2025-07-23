import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-screen z-10 bg-black/60 backdrop-blur-xs py-3 md:py-5 transition-all duration-500 fade-in-down ${
        isScrolled ? "outline-[1px] outline-(--secondary-bg-color)" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center">
          <a
            href="/"
            className="text-(--primary-color) playwrite-ro font-semibold text-xl md:text-2xl lg:text-3xl"
          >
            Puri RaniLasem
          </a>
          <ul className="hidden md:flex gap-6 lg:gap-9 xl:gap-12">
            <li>
              <a href="#home" className="navbar">Home</a>
            </li>
            <li>
              <a href="#gallery" className="navbar">Galleries</a>
            </li>
            <li>
              <a href="#contact" className="navbar">Contact</a>
            </li>
          </ul>
          <span className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:text-(--border-color)"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              )}
            </button>
          </span>
        </div>
      </div>
      {isOpen && (
        <ul className="md:hidden p-4 pt-6 flex flex-col items-center gap-4">
          <li>
            <a href="#home" className="font-semibold navbar" onClick={closeMenu}>Home</a>
          </li>
          <li>
            <a href="#gallery" className="font-semibold navbar" onClick={closeMenu}>Galleries</a>
          </li>
          <li>
            <a href="#contact" className="font-semibold navbar" onClick={closeMenu}>Contact</a>
          </li>
        </ul>
      )}
    </nav>
  );
}