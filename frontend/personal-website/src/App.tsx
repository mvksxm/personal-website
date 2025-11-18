import { useRef, useState, type RefObject } from 'react'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import Head from './components/Head/Head'
import About from './components/About/About'
import SectionBackground from './components/Sections/SectionBackground'

function App() {

  const [isFormedNav, setFormedNav] = useState(false)

  // Section references
  var aboutSecRef = useRef(null)
  var workSecRef = useRef(null)
  var projectSecRef = useRef(null)

  // Scrolling Event Listener
  window.addEventListener('scroll', () => {
     if(window.scrollY <= 0 && window.innerWidth > 800) {
      setFormedNav(false)
     } 
     else {
      setFormedNav(true)
     }
  })

    // Resize Event Listener
    window.addEventListener('resize', () => {
      console.log(window.innerWidth)
      if(window.innerWidth <= 800) {
       setFormedNav(true)
      } 
   })
 

  return (
    <>
      <div className="cloud-bg-image">
        <Navbar isFormedNav={isFormedNav} />
        <Head />
      </div>
      <SectionBackground sectionRef={aboutSecRef}>
          <section ref={aboutSecRef} id="about" className="section">
            <About /> 
          </section>
      </SectionBackground>
    </>
  )
}

export default App
