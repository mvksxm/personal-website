import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import Head from './components/Head/Head'
import About from './components/About/About'
import SectionWrapper from './components/Sections/SectionWrapper'
import Work from './components/Work/Work'

function App() {

  const [isFormedNav, setFormedNav] = useState(false)

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
    <div className="main-body">
      <div className="cloud-bg-image">
        <Navbar isFormedNav={isFormedNav} />
        <Head />
      </div>
      <SectionWrapper sectionId="about">
        <About />
      </SectionWrapper>
      <SectionWrapper sectionId="work">
        <Work />
      </SectionWrapper>
      <footer>
        <div style={{color: "white"}}>© Copyright | Maksim Turtsevich 2025 All Rights Reserved</div>
      </footer>
    </div>
  )
}

export default App
