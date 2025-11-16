import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import Head from './components/Head/Head'
import About from './components/About/About'

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
    <>
      <section className="bg-image">
        <Navbar isFormedNav={isFormedNav} />
        <Head />
      </section>
      <About />
      {/* <button style={{marginLeft:"auto"}} onClick={() => {
          if (!isFormedNav) {
            setFormedNav(true)
          } else {
            setFormedNav(false)
          }
        }
      }>
        Test Button
      </button> */}
    </>
  )
}

export default App
