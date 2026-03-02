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
            "JS",
            "Java"
        ],
        "Tools & Frameworks": [
            "Docker",
            "K8S", 
            "Django",
            "Flask",
            "React",
            "GCP",
            "AWS",
            "Azure"
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
                    <img className="personal-photo" src={images["personal-photo.jpg"]}></img>
                </div>
                <div className="col col-general">
                    <b>
                        <span style={{color: "white", textTransform: "uppercase"}}>Greetings! Thank you for visiting my <b>webpage!</b></span>
                    </b>
                    <h3>My name is <b>Maksim Turtsevich.</b></h3>
                    <p>
                        With over 4 years of commercial experience in Cloud and Software Engineering, I'm specializing in the end to end planning, design and implementation of complex 
                        Cloud based systems for different usecases. During my recent assignments, I had a chance to contribute to the development of internal and customer facing Backend APIs, 
                        engineered internal productivity tools and developed monitoring solutions for the better visibility on the cost and resource utilization of the Cloud-based data architecture.
                    </p>
                    <p>
                        Aside from the Backend Engineering experience, I also possess knowledge in areas such as Big Data Engineering and DevOps Engineering, gained from the projects related to the 
                        development of Data Pipelines, deployment of CI/CD Pipelines and provisioning/administration of a Cloud Infrastructure.
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