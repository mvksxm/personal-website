import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Navbar.css";
import images from "../../../public/exporter"
import Utils from "../../utils/Utils";

interface NavbarProps {
  isFormedNav: boolean;
}

const Navbar = ({isFormedNav}: NavbarProps) => {
  
  const [section, setActiveSection] = useState("")
  const [observerThreshold, setThreshold] = useState(0.5)
  const [isInfoColor, setInfoColor] = useState(false)

  const resizeCallback = () => {
    var devicePixelRatio = window.devicePixelRatio
    if (devicePixelRatio > 1) {
      var threshold = Utils.floorFractionalNumber(0.5 / Utils.floorFractionalNumber(devicePixelRatio, 2), 1)
      setThreshold(threshold)
    } else {
      setThreshold(0.5)
    }
  }
  
  useEffect(
    () => {

      window.addEventListener('resize', resizeCallback)
      
      var sections = document.querySelectorAll("section")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              console.log("Section intersection!")
              setActiveSection(entry.target.id)
            }
            
            if(entry.isIntersecting && entry.target.id != "home" && !isInfoColor) {
              setInfoColor(true)
            }

            if(entry.isIntersecting && entry.target.id === "home" && isInfoColor) {
              setInfoColor(false)
            }

          })
        },
        {
          threshold: observerThreshold
        }
      )
      sections.forEach(section => observer.observe(section))

      // TODO: Think about implementing an additional observer with another threshold for the color change of the Navbar.

      return () => {
        window.removeEventListener('resize', resizeCallback);
      }
    }, [observerThreshold, isInfoColor]
  )

  const setSection = (sectionId: string, navbarId: string = "navbar") => {

    var targetSection = document.getElementById(sectionId)
    if (targetSection === null) {
      throw Error(`An incorrect section id - ${sectionId} was provided!`)
    }

    // Get Navbar
    var navHeight = document.getElementById(navbarId)?.offsetHeight
    if (navHeight == null) {
      throw Error(`Provided id of the navbar - ${navbarId} is incorrect.`)
    }

    var sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY
    console.log(window.devicePixelRatio)

    window.scrollTo({
      top: sectionPosition - navHeight,
      behavior: 'smooth'
    });

    setActiveSection(sectionId)
  }

  return (
    <>
      <nav id="navbar" className={`navbar nav-color fixed-top navbar-expand-lg ${isFormedNav ? "nav-appear" : ""} ${isInfoColor ? "nav-info-color" : ""}`}>
        <div className="container navbar-nav-container">
          <img className="navbar-icon" src={images["cloud.png"]} style={{marginRight: "20px"}}></img>
          <a className="name-brand" href="#">Maksim Turtsevich</a>
          <img className="navbar-icon" src={images["cloud.png"]} style={{marginLeft: "20px"}}></img>
          <div className="collapse navbar-collapse navbar-nav-custom" id="navbarNav">
            <ul className="navbar-nav navbar-nav-ul">
              <li className="nav-item">
                <button className={`nav-link ${section === "home" ? "active-selection" : ""}`} onClick={() => setSection("home")} aria-current="page">Home</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${section === "about" ? "active-selection" : ""}`} onClick={() => setSection("about")}>About</button> 
              </li>
              <li className="nav-item">
                <button className={`nav-link ${section === "work" ? "active-selection" : ""}`} onClick={() => setSection("work")}>Work</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${section === "projects" ? "active-selection" : ""}`} onClick={() => setSection("projects")}>Projects</button>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
    </>
  )
}

export default Navbar;