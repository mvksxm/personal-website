import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Navbar.css";
import images from "../../../public/exporter"


interface NavbarProps {
  isFormedNav: boolean;
}

const Navbar = ({isFormedNav}: NavbarProps) => {
  
  const [section, setSection] = useState("")


  useEffect(
    () => {
      var sections = document.querySelectorAll("section")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setSection(entry.target.id)
            }
          })
        },
        {
          threshold: 0.9
        }
      )
      sections.forEach(section => observer.observe(section)) 
    }, 
    []
  )

  return (
    <>
      <nav className={`navbar fixed-top navbar-expand-lg ${isFormedNav ? "nav-appear" : ""}`} style={{textTransform: "uppercase", backgroundColor: "rgba(255, 255, 255, 0)"}}>
        <div className="container navbar-nav-container">
          <img className="navbar-icon" src={images["cloud.png"]} style={{marginRight: "20px"}}></img>
          <a className="name-brand" href="#">Maksim Turtsevich</a>
          <img className="navbar-icon" src={images["cloud.png"]} style={{marginLeft: "20px"}}></img>
          <div className="collapse navbar-collapse navbar-nav-custom" id="navbarNav">
            <ul className="navbar-nav navbar-nav-ul">
              <li className="nav-item">
                <a className={`nav-link ${section === "home" ? "active-selection" : ""}`} onClick={() => setSection("home")} aria-current="page" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${section === "about" ? "active-selection" : ""}`} onClick={() => setSection("about")} href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${section === "work" ? "active-selection" : ""}`} onClick={() => setSection("work")} href="#work">Work</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${section === "projects" ? "active-selection" : ""}`} onClick={() => setSection("projects")} href="#projects">Projects</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
    </>
  )
}

export default Navbar;