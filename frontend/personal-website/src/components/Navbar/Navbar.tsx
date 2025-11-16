import { useState } from "react";
import MissingSectionException from "../../exceptions/MissingSectionException";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Navbar.css";
import images from "../../../public/exporter"


interface NavbarProps {
  isFormedNav: boolean;
}

const Navbar = ({isFormedNav}: NavbarProps) => {
  
  // Active navbar section variables
  var sectionsActiveMap: Record<string, string> = {
    "home": "", 
    "about": "",
    "work": "", 
    "projects": ""
  }

  const [sections, setSections] = useState<Record<string, string>>(sectionsActiveMap)

  
  const resetAllActive = (): Record<string, string> => {
    const resetActiveSections: Record<string, string> = {}
    Object.keys(sections).forEach(key => {
      resetActiveSections[key] = ""
    })

    return resetActiveSections
  }

  const setActiveButton = (section: string = "home") => {
    
    section = section.toLowerCase()
    const allowedValues = ["home", "about", "work", "projects"]
    var sectionPresent = allowedValues.includes(section) 

    if (!sectionPresent) {
      throw new MissingSectionException(section, "navbar", allowedValues)
    }

    const resetActiveSections = resetAllActive()
    resetActiveSections[section] = "active-selection"

    setSections(resetActiveSections)
  }


  return (
    <>
      <nav className={`navbar fixed-top navbar-expand-lg ${isFormedNav ? "nav-appear" : ""}`} style={{textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 0)"}}>
        <div className="container navbar-nav-container">
          <img className="navbar-icon" src={images["cloud-icon.png"]} style={{marginRight: "20px"}}></img>
          <a className="name-brand" onClick={() => setSections(resetAllActive())} href="#">Maksim Turtsevich</a>
          <img className="navbar-icon" src={images["cloud-icon.png"]} style={{marginLeft: "20px"}}></img>
          <div className="collapse navbar-collapse navbar-nav-custom" id="navbarNav">
            <ul className="navbar-nav navbar-nav-ul">
              <li className="nav-item">
                <a className={`nav-link ${sections["home"]}`} onClick={() => setActiveButton("home")} aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${sections["about"]}`} onClick={() => setActiveButton("about")} href="#">About</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${sections["work"]}`} onClick={() => setActiveButton("work")} href="#">Work</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${sections["projects"]}`} onClick={() => setActiveButton("projects")} href="#">Projects</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
    </>
  )
}

export default Navbar;