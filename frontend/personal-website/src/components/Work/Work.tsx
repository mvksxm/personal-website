import { useEffect, useState, type JSX } from "react"
import "./Work.css"
import axios from "axios";
import type { StringDivProps, WorkExperienceType } from "../../models";
import images from "../../../public/exporter"
import Carousel from "../Carousel/Carousel";

// Global Vars
const BACKEND_URL: string = import.meta.env.BACKEND_URL ? import.meta.env.BACKEND_URL: "http://localhost:8080";
const WORK_EXPERIENCE_COLLECTION: string = import.meta.env.WORK_EXPERIENCE_COLLECTION ? import.meta.env.WORK_EXPERIENCE_COLLECTION : "workExperience";
const experienceRequest = {
    "isList": true,
    "collectionName": WORK_EXPERIENCE_COLLECTION
};

// Formatter setup
const dtf = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    }
)

const testData = [
    {
        "id": "QWJib3R0",
        "companyName": "Abbott",
        "position": "Intern DevOps/Data Engineer",
        "dateStart": "2021-12-01",
        "dateEnd": "2022-05-01",
        "location": "Warsaw, Poland",
        "logoUrl": "https://raw.githubusercontent.com/mvksxm/personal-website/refs/heads/master/frontend/personal-website/public/images/logos/AbbottLogo.svg",
        "technologies": [
            "Python",
            "AWS",
            "Terraform",
            "Apache Spark"
        ],
        "jobResponsibilities": [
            "Supported Abbott's internal Big-Data/AI AWS-based platform. Specifically, was responsible for debugging issues related to infrastructure provisioning, deployment and exploitation.",
            "Contributed to the data processing AWS Lambda functions and Apache Spark based ETL Glue Jobs",
            "Developed AWS CloudFormation templates and Terraform configuration files for the AWS resources that were later utilized by the members of a Data Science team.",
            "Developed and integrated a custom Bash script into CodePipeline workflow, which was responsible for automated build and deployment of the AWS Cloud Functions across the Abbott's AWS environment."
        ]
    },
    {
        "id": "RFhDIFRlY2hub2xvZ3k=",
        "companyName": "DXC Technology",
        "position": "Data Engineer",
        "dateStart": "2023-01-16",
        "dateEnd": "2023-05-01",
        "location": "Warsaw, Poland",
        "logoUrl": "https://raw.githubusercontent.com/mvksxm/personal-website/refs/heads/master/frontend/personal-website/public/images/logos/DXCLogo.png",
        "technologies": [
            "Azure"
        ],
        "jobResponsibilities": [
            "Developed and maintained Azure-based Data Pipelines for processing the stock/inventory data of a big FMCG Client. Pipelines were built by using Python, Azure Databricks, Apache Spark, Azure Datafactory and Synapse Analytics.",
            "Developed C# (.NET) based Azure Functions as part of major pipeline workflows for performing an additional data enrichment operations.",
            "Built CI/CD pipelines and automated tests for the Data Pipelines and Azure functions by making use of Azure DevOps Pipelines.",
            "Created Terraform configrations for the deployment of the new Data Processing clusters and Database Instances on Azure."
        ]
    },
    {
        "id": "RGV2b3RlYW0gRyBDbG91ZA==",
        "companyName": "Devoteam G Cloud",
        "position": "Cloud Support Engineer",
        "dateStart": "2022-05-01",
        "dateEnd": "2023-01-16",
        "location": "Warsaw, Poland",
        "logoUrl": "https://raw.githubusercontent.com/mvksxm/personal-website/refs/heads/master/frontend/personal-website/public/images/logos/DevoteamLogo.png",
        "technologies": [
            "Python",
            "Terraform",
            "Google Cloud"
        ],
        "jobResponsibilities": [
            "Initiated and developed a solution on top of the Google's open source project - 'gcpdiag', that was automatically comparing clients' infrastructure deployed in the GCP against the most common bad practices that could cause major issues. Results were automatically returned to the Support Engineer assigned to the ticket, which significantly assisted him with the further resolvement of the issue occured.",
            "Developed GCP Cloud Functions for automation of the manual routine tasks that were constantly performed in the Support Department.",
            "Served as a first line Support Engineer for the Clients with the Google Cloud based Infrastructure"
        ]
    },
    {
        "id": "UHJvY3RlciAmIEdhbWJsZQ==",
        "companyName": "Procter & Gamble",
        "position": "Software Engineer",
        "dateStart": "2023-05-01",
        "dateEnd": "2024-09-13",
        "location": "Warsaw, Poland",
        "logoUrl": "https://raw.githubusercontent.com/mvksxm/personal-website/refs/heads/master/frontend/personal-website/public/images/logos/PGLogo.png",
        "technologies": [
            "Golang",
            "Python",
            "Terraform",
            "GCP",
            "BigQuery",
            "Kubernetes",
            "Apache Airflow"
        ],
        "jobResponsibilities": [
            "Initiated, architected and developed Golang-based custom parsing solution for automatic modification of Terraform configuration files and exposed it to internal teams using a REST API. The API was consumed by the major P&G project 'AI Factory' for provisioning AI infrastructure in GCP.",
            "Developed a solution for monitoring BigQuery processing slot consumption across the P&G GCP environment. The project utilized Python, BigQuery, GCP's Apache Airflow (Cloud Composer), and Looker Studio. The solution was later used by Cloud Support teams to identify performance issues and resolve them faster.",
            "Guided application teams on best practices for deploying solutions on P&G's GCP platform. Reviewed and adjusted architectures, created CI/CD pipelines (Jenkins, Cloud Build, GitHub Actions), and developed Terraform configurations.",
            "Packaged GCP resources and reusable application architectures into Terraform modules for the later usage by application teams. Security and performance best practices were enforced in the modules delivered."
        ]
    }
]

console.log(experienceRequest)

const arrangeResp = (jobResp: string[]) => {
    let currIndex = 0;
    return (
        jobResp.map(resp => {
            if (currIndex === jobResp.length - 1) {
                return <li>{resp}</li>
            }
            currIndex += 1
            return (
                <>
                    <li>{resp}</li>
                    <br />
                </>
            )
        })
    )
}

const generateWorkFrames = (elements: WorkExperienceType[]): React.ReactElement<StringDivProps>[] => {

    elements.sort((a, b) => {
        let dsa = new Date(a["dateStart"])
        let dsb = new Date(b["dateStart"])
        if (dsa > dsb) {
            return -1
        }
        if (dsb > dsa) {
            return 1
        }
        return 0  
    })

    let framesArray: React.ReactElement<StringDivProps>[] = elements.map((elem, idx) => {
        return (
            <div id={`we${idx}`} className="work-frame">
                <div className="work-frame-header">
                    <img className="work-frame-img" src={elem["logoUrl"]}></img>
                    <div>
                        <div><b>{elem.companyName}</b></div>
                        <div>{elem.position}</div>
                    </div>
                    
                    {/* <div style={{display: "inline-block" }}>Software Engineer</div> */}

                    {/* <div className="work-frame-header">
                        <div style={{display: "inline-block"}}>Sunwing</div>
                        <div>Software Engineer</div>
                    </div> */}
                </div>
                <div style={{display: "flex", marginTop: "1%"}}>
                    <div className="work-frame-location-date">
                        <img className="work-frame-icon" src={images["location.svg"]}></img>
                        <div style={{marginLeft:"0.2vw"}}>{elem.location}</div>
                    </div>
                    <div className="work-frame-location-date" style={{width: "50%"}}>
                        <img className="work-frame-icon" src={images["calendar.svg"]}></img>
                        <div style={{marginLeft:"0.5vw"}}>{dtf.format(new Date(elem.dateStart))} - {elem.dateEnd === "Current" ? "Current" : dtf.format(new Date(elem.dateEnd))}</div>
                    </div>
                </div>

                <div className="work-frame-body">
                    <div>
                        <ul>
                            {/* {testData[0]["jobResponsibilities"].map(jr => 
                                <>
                                    <li>{jr}</li>
                                    <br />
                                </>
                            ).slice( )} */}
                            {arrangeResp(elem["jobResponsibilities"])}
                        </ul>
                    </div>
                    <div style={{margin: "1%", display: "flex", alignItems: "center",width: "100%"}}>
                        <span>Technologies: </span>
                        <div style={{display: "flex", alignItems: "center", flexWrap:"wrap"}}>
                            {elem["technologies"].map(tech => <div className="tech-item">{tech}</div>)}
                        </div>
                        
                        {/* <div className="tech-item">Test</div> */}
                    </div>
                </div>
                
            </div>
        )
    })

    return framesArray   
}

const Work = () => {
    
    const [workExperience, setWorkExperience] = useState<WorkExperienceType[]>([])
    
    useEffect(() => {
 
        axios.post<WorkExperienceType[]>(BACKEND_URL, experienceRequest,
            {   
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(resp => {
            if (resp.statusText === "OK" && resp.data !== null) {
                setWorkExperience(resp.data)
            } else if (resp.statusText !== "OK") {
                throw new Error(`Endpoint - ${BACKEND_URL} returned the following error status code - ${resp.status}!`)
            } else if (resp.data === null) {
                throw new Error(`Empty data was returned from the following url - ${BACKEND_URL}!`)
            }
        }).catch((err) => {
            throw err;
        })

    }, [])
    
    
    return (
        <div className="work-container">
            <h1 className="work-header">Work Experience</h1>
            <div className="work-content">
                <Carousel elements={generateWorkFrames(testData)}/>
                {/* {generateWorkFrames(testData)[1]} */}
                {/* <div className="work-frame">
                    <div className="work-frame-header">
                        <img className="work-frame-img" src="https://raw.githubusercontent.com/mvksxm/personal-website/refs/heads/master/frontend/personal-website/public/images/logos/SunwingLogo.png"></img>
                        <div>
                            <h4>Sunwing Corporation</h4>
                            <div>Software Engineer</div>
                        </div>
                    </div>
                    <div style={{display: "flex", marginTop: "1%"}}>
                        <div className="work-frame-location-date">
                            <img className="work-frame-icon" src={images["location.svg"]}></img>
                            <div>Toronto, ON</div>
                        </div>
                        <div className="work-frame-location-date">
                            <img className="work-frame-icon" src={images["calendar.svg"]}></img>
                            <div style={{marginLeft:"5%", whiteSpace:"nowrap"}}>May 2022 - Jan 2023</div>
                        </div>
                    </div>

                    <div className="work-frame-body">
                        <div>
                            <ul>
                                {arrangeResp(testData[0]["jobResponsibilities"])}
                            </ul>
                        </div>
                        <div style={{margin: "1%", width:"100%", display: "flex", alignItems: "center"}}>
                            <span>Technologies: </span>
                            {testData[0]["technologies"].map(tech => <div className="tech-item">{tech}</div>)}
                        </div>
                    </div>
                    
                </div> */}
            </div>         
        </div>
    )
}


export default Work