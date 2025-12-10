import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Navbar.css";
import images from "../../../public/exporter"
import Utils from "../../utils/Utils";

interface NavbarProps {
  isFormedNav: boolean;
}

const Navbar = ({isFormedNav}: NavbarProps) => {
  
  const [section, setActiveSection] = useState("")
  const interThreshold = useRef(0.5)
  // const recolorThreshold = useRef(0.75)
  const [isInfoColor, changeInfoColor] = useState(false)

  const resizeCallback = () => {
    var devicePixelRatio = window.devicePixelRatio
    // console.log("Recolor threshold ", recolorThreshold)

    // if (devicePixelRatio >= 1.5) {
    //   // setRecolorThreshold(0.1)
    //   recolorThreshold.current = 0.1
    // }

    // if (devicePixelRatio < 1.5) {
    //   console.log("settting")
    //   recolorThreshold.current = 0.75
    // }

    if (devicePixelRatio > 1) {
      var threshold = Utils.floorFractionalNumber(0.5 / Utils.floorFractionalNumber(devicePixelRatio, 2), 1)
      interThreshold.current = threshold
    }

    if (devicePixelRatio <= 1) {
      interThreshold.current = 0.5
    }

  }

  const sectionLightCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("Section intersection!")
        setActiveSection(entry.target.id)
      }
    })
  }

  const navColorCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(
      (entry) => {
        console.log(entry.target.id)
        if(entry.isIntersecting && entry.target.id != "home") { 
          console.log("id true:", entry.target.id)
          changeInfoColor(true)
        }
        if(entry.isIntersecting && entry.target.id === "home") {
          console.log("id false:", entry.target.id)
          changeInfoColor(false)
        }
      }
    )
  }
  
  useEffect(
    () => {

      let sectionFleshObserver: IntersectionObserver
      let navChangeObserver: IntersectionObserver

      const createObservers = () => {
        var sections = document.querySelectorAll("section")

        sectionFleshObserver?.disconnect()
        sectionFleshObserver = new IntersectionObserver(
            sectionLightCallback,
            {
              threshold: interThreshold.current
            }
        )
        
        navChangeObserver?.disconnect()
        navChangeObserver = new IntersectionObserver(
          navColorCallback,
          {
            threshold: interThreshold.current
          }
        )

        sections.forEach((section) => {
          sectionFleshObserver.observe(section)
          navChangeObserver.observe(section)
        })
      }


      const resizeLogic = () => {
        resizeCallback()
        createObservers()
      }

      resizeLogic()
      window.addEventListener('resize', resizeLogic)

      return () => {
        window.removeEventListener('resize', resizeCallback);
        sectionFleshObserver?.disconnect();
        navChangeObserver?.disconnect();
      }
    }, []
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