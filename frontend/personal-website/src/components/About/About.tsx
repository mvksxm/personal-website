import "./About.scss"
import images from "../../../public/exporter"
import Skills from "./Skills/Skills";

const About = () => {
    
    const skillsObject = {
        "Languages": [
            "Python",
            "Golang",
            "Terraform",
            "Bash",
            "SQL",
            "C#",
            "JavaScript",
            "Java"
        ],
        "Tools & Frameworks": [
            "Docker",
            "K8S", 
            "Django",
            "Flask",
            "React"
        ]
    }


    const skillsMap = new Map<string, Array<string>>(
        Object.entries(skillsObject)
              .map(([key, value]) => [key, [...value]])
    )
                                       

    return (
        <div className="container-about">
            <h1 className="head-about">About <b>Me</b></h1>
            <div className="row" style={{justifyContent: "center"}}>
                <div className="col col-general col-centered">
                    <img className="personal-photo" src={images["caracal.jpg"]}></img>
                </div>
                <div className="col col-general">
                    <b>
                        <span style={{color: "white", textTransform: "uppercase"}}>Greetings! Thank you for visiting my <b>webpage!</b></span>
                    </b>
                    <h3>My name is <b>Maksim Turtsevich.</b></h3>
                    <p>
                        I'm a results-driven <b>Software Engineer</b> with the specialization in <b>Cloud</b> and <b>Platform Development</b>.
                        With 4 years of commercial experience in <b>Cloud Infrastructure</b>  &  <b>Backend Software Development</b> and 
                        with deep expertise in <b>Google Cloud</b>, <b>Terraform</b>, and <b>System Engineering</b>, 
                        I specialize in designing and implementing efficient, scalable, and cost-effective cloud solutions tailored to diverse use cases, 
                        including <b>data pipelines</b>, <b>microservice-based</b> enterprise applications, and <b>CI/CD pipelines</b>.
                    </p>
                    <p>
                        Beyond my <b>Cloud Engineering</b> expertise, I bring robust <b>Software Engineering</b> skills, particularly in <b>Big Data</b> and <b>Backend Development</b>. 
                        Proficient in <b>Python</b>, <b>Golang</b>, <b>Docker</b>, and <b>Kubernetes</b>, I excel in roles requiring the end-to-end design and implementation of complex solutions.
                    </p>
                    <p>
                        Finally, I also possess a <b>MSc. in Computer Science</b> from the <b>Polish Japanese Academy of the Information Technology</b> located 
                        in <b>Warsaw, Poland</b>. My final thesis's research topic was related to <b>Cloud</b> and <b>Big Data Engineering</b>.
                    </p>
                    <p>
                        Feel free to reach out and connect with me on LinkedIn! Also, you can definitely drop a message on my Email, in case, if it's a more preferred option!
                    </p>
                    <div className="row" style={{marginTop: "1vh"}}>
                        <Skills skillsMap={skillsMap} ></Skills>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default About;