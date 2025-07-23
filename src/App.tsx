import './styles/global.css'
import './styles/font.css'
import './styles/webkit.css'
import Home from './components/Home.tsx'
import Gallery from './components/Gallery.tsx'
import Footer from './components/Footer.tsx'
import Navbar  from './components/partials/navbar.tsx'

function App() {

	document.addEventListener('dragstart', function(event) {
  	event.preventDefault();
	});

  return (
    <>
      <Navbar />
      <Home />
      <Gallery />
      <Footer />
    </>
  )
}

export default App
