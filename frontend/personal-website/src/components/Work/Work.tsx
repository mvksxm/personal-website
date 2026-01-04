import { useEffect, useState } from "react"
import "./Work.css"
import type { StringDivProps, WorkExperienceType } from "../../models/models";
import images from "../../../public/exporter"
import Carousel from "../Carousel/Carousel";
import Requestor from "../../utils/Requestor";

// Global Vars
const VERCEL_ENDPOINT: string = import.meta.env.VERCEL_SERVER_ENDPOINT ? import.meta.env.VERCEL_SERVER_ENDPOINT: "/api/request-handler";
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

// Requestor Instance
const requestor = new Requestor(VERCEL_ENDPOINT, "mtWorkExperience", {
    "Content-Type": "application/json"
})

const testData = [
    {
        "id": "U3Vud2luZw==",
        "companyName": "Sunwing",
        "position": "Software Engineer",
        "dateStart": "2024-09-16",
        "dateEnd": "Current",
        "location": "Toronto, ON",
        "logoUrl": "https://raw.githubusercontent.com/mvksxm/personal-website/refs/heads/master/frontend/personal-website/public/images/logos/SunwingLogo.png",
        "technologies": [
            "C#",
            ".NET",
            "Azure",
            "SQL Server"
        ],
        "jobResponsibilities": [
            "Served as an individual contributor and maintainer of the core .NET-based backend Sunwing interfaces such as User Profile and User Auth APIs.",
            "Participated in the integration project with the Westjet Airlines. Specifically, was responsible for interconnection of the core backend Sunwing APIs with internal services of the Westjet.",
            "Maintained and enhanced internal .NET-based Batch Jobs. Improvement: Introduced an automatic reprocessing logic that reduced the amount of issues that should be handled manually by 80%.",
            "Continuosly collborated with the Technical Leaders, Product Managers and QA Engineers in order to ensure the maximum quality of the features delivered."
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
            "Initiated, architected and developed Golang-based custom parsing solution for automatic modification of Terraform configuration files and exposed it via a REST API. Solution reduced manual efforts, when creating GCP resources, by 80%.",
            "Developed a solution in a form of Dashboard for monitoring BigQuery processing slot consumption across the P&G's GCP environment.The solution allowed Cloud Support Team to identify and resolve issues 50% faster.(Avg. resolution time was reduced from 1 hour to 30 minutes.",
            "Guided application teams on best practices for deploying solutions on P&G's GCP platform. Reviewed and adjusted architectures, created CI/CD pipelines (Jenkins, Cloud Build, GitHub Actions), and developed Terraform configurations.",
            "Packaged GCP resources and reusable application architectures into Terraform modules for the later usage by application teams. Enforced security and performance best practices in the modules delivered."
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
            "Python",
            "Azure",
            "SQL Server",
            "Apache Spark"
        ],
        "jobResponsibilities": [
            "Developed and maintained Azure-based Data Pipelines for processing the stock/inventory data of a big FMCG Client.",
            "Developed C# (.NET) based Azure Functions as part of major pipeline workflows for performing an additional data enrichment operations.",
            "Built CI/CD pipelines and automated tests for the Data Pipelines and Azure functions by making use of Azure DevOps Pipelines.",
            "Created Terraform configurations for the deployment of the new Data Processing clusters and Database Instances on Azure."
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
            "Developed a custom service on top of the Google's open source project - 'gcpdiag', which was automatically analyzing customer's infrastructure against the most common GCP's bad practices that could cause major issues. Solution reduced the debugging time for simple/medium issues by ~80%.",
            "Developed GCP Cloud Functions for automation of the manual routine tasks that were constantly performed in the Support Department.",
            "Served as a first line Support Engineer for the Clients with the Google Cloud based Infrastructure"
        ]
    },
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
            "Developed and integrated a custom Bash script into CodePipeline workflow, which was responsible for automated build and deployment of the AWS Cloud Functions across the Abbott's AWS environment. Solution completely eliminated the need for manual deployment."
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
        requestor.postRequest<{status:string, payload: WorkExperienceType[]}>(
            experienceRequest
        ).then((resp) => {
            setWorkExperience(resp.payload)
        }).catch((err) => {
            throw err
        }) 
    }, [])
    
    return (
        <div className="work-container">
            <h1 className="work-header">Work Experience</h1>
            <div className="work-content">
                {workExperience.length > 0 ? <Carousel elements={generateWorkFrames(workExperience)}/> : <div/>}
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