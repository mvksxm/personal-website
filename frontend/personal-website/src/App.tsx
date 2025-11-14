import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import "./styles/bg-image.css"
import Head from './components/Head/Head'
import About from './components/About/About'

function App() {
  const [isFormedNav, setFormedNav] = useState(false)

  // Scrolling Event Listener
  window.addEventListener('scroll', () => {
     if(window.scrollY <= 0) {
      setFormedNav(false)
     } 
     else {
      setFormedNav(true)
     }
  })

  return (
    <>
      <div className="bg-image">
        <Navbar isFormedNav={isFormedNav} />
        <Head />
      </div>
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
