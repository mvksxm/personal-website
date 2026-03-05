import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import Head from './components/Head/Head'
import About from './components/About/About'
import SectionWrapper from './components/Sections/SectionWrapper'
import Work from './components/Work/Work'
import Utils from './utils/Utils'

function App() {

  const [isFormedNav, setFormedNav] = useState(false)

  useEffect(() => {
    Utils.AdjustClasses("main-body", [], ["not-loaded"])
  }, [])

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
    if(window.innerWidth <= 800) {
      setFormedNav(true)
    } 
  })
 

  return (
    <div className="root">
      <div id="main-body" className="main-body not-loaded">
        <Navbar isFormedNav={isFormedNav} />
        <Head />
        <hr />
        <SectionWrapper sectionId="about">
          <About />
        </SectionWrapper>
        <hr />
        <SectionWrapper sectionId="work">
          <Work />
        </SectionWrapper>
        <hr />
        <footer>
          <div>© Copyright | Maksim Turtsevich {Utils.GetDate().split("/")[2]} All Rights Reserved</div>
        </footer>
      </div>
    </div>
  )
}

export default App
