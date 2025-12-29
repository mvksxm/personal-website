import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Navbar.css";
import images from "../../../public/exporter"
import Utils from "../../utils/Utils";
import { Collapse } from 'bootstrap';


interface NavbarProps {
  isFormedNav: boolean;
}

const Navbar = ({isFormedNav}: NavbarProps) => {
  
  const [section, setActiveSection] = useState("")
  const interThreshold = useRef(0.5)
  // const recolorThreshold = useRef(0.75)
  const [isInfoColor, changeInfoColor] = useState(false)
  const navSize = useRef(0)

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

      // Set initial size of the navbar
      let navSizeLocal = document.getElementById("navbar")?.offsetHeight
      if (navSizeLocal) {
         navSize.current = navSizeLocal
      } else {
        throw new Error("HTML element with the id - 'navbar' does not exist!")
      }

      let sectionFleshObserver: IntersectionObserver
      let navChangeObserver: IntersectionObserver

      const createObservers = () => {
        var sections = document.querySelectorAll("section")

        sectionFleshObserver?.disconnect()
        sectionFleshObserver = new IntersectionObserver(
            sectionLightCallback,
            {
              threshold: 0,
              rootMargin: "-10% 0% -90% 0%"
            }
        )
        
        navChangeObserver?.disconnect()
        navChangeObserver = new IntersectionObserver(
          navColorCallback,
          {
            threshold: 0,
            rootMargin: "-10% 0% -90% 0%"
          }
        )

        sections.forEach((section) => {
          sectionFleshObserver.observe(section)
          navChangeObserver.observe(section)
        })
      }


      createObservers()

      // Obsolete logic (will be removed)
      // const resizeLogic = () => {
      //   resizeCallback()
      //   createObservers()
      // }
      // resizeLogic()
      // window.addEventListener('resize', resizeLogic)

      return () => {
        // window.removeEventListener('resize', resizeCallback);
        sectionFleshObserver?.disconnect();
        navChangeObserver?.disconnect();
      }
    }, []
  )

  const setSection = (sectionId: string) => {

    var targetSection = document.getElementById(sectionId)
    if (targetSection === null) {
      throw Error(`An incorrect section id - ${sectionId} was provided!`)
    }

    var sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY
    console.log(window.devicePixelRatio)

    window.scrollTo({
      top: sectionPosition - navSize.current,
      behavior: 'smooth'
    });

    setActiveSection(sectionId)
  }

  const closeNavbar = (): boolean => {
    const navbar = document.getElementById('navbarNav');
    if (!navbar) return false;
    
    if (navbar.classList.contains("show")) {

      const collapse = Collapse.getInstance(navbar) 
      || new Collapse(navbar);

      collapse.hide();
      return true;
    }

    return false
  };

  const openNavbar = (): boolean => {
    const navbar = document.getElementById('navbarNav');
    if (!navbar) return false;
    
    if (!navbar.classList.contains("show")) {

      const collapse = Collapse.getInstance(navbar) 
      || new Collapse(navbar);
      
      collapse.show();
      return true;
    }

    return false
  };

  return (
    <>
      <nav id="navbar" className={`navbar nav-color fixed-top navbar-expand-lg ${isFormedNav ? "nav-appear" : ""} ${isInfoColor ? "nav-info-color" : ""}`}>
        <div className="container navbar-nav-container">
          <div className="mr-auto">
            <img className="navbar-icon" src={images["cloud.png"]} style={{marginRight: "20px"}}></img>
            <a className="name-brand" href="#">Maksim Turtsevich</a>
            <img className="navbar-icon" src={images["cloud.png"]} style={{marginLeft: "20px"}}></img>
          </div>
          <button onClick={() => openNavbar() || closeNavbar()} className="navbar-toggler" type="button" aria-label="Toggle navigation">
            <img className="nav-burger" src={images["burger.svg"]}></img>
          </button>
          <div className="navbar-collapse collapse" id="navbarNav">
            <ul className="navbar-nav navbar-nav-ul ml-auto">
              <li className="nav-item">
                <button className={`nav-link ${section === "home" ? "active-selection" : ""}`} onClick={() => { setSection("home"); closeNavbar()}} aria-current="page">Home</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${section === "about" ? "active-selection" : ""}`} onClick={() => {setSection("about"); closeNavbar()}}>About</button> 
              </li>
              <li className="nav-item">
                <button className={`nav-link ${section === "work" ? "active-selection" : ""}`} onClick={() => {setSection("work"); closeNavbar()}}>Work</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${section === "projects" ? "active-selection" : ""}`} onClick={() => {setSection("projects"); closeNavbar()}}>Projects</button>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
    </>
  )
}

export default Navbar;