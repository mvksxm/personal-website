project_id         = "marine-catfish-310009"
firestore_location = "nam5"

work_experience = [
  {
    "companyName" : { "stringValue" : "Sunwing" },
    "position" : { "stringValue" : "Software Engineer" },
    "dateStart" : { "stringValue" : "2024-09-16" },
    "dateEnd" : { "stringValue" : "Current" },
    "location" : { "stringValue" : "Toronto, ON" },
    "logoUrl" : { "stringValue" : "https://www.logo.wine/a/logo/Sunwing_Airlines/Sunwing_Airlines-Logo.wine.svg" },
    "technologies" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "C#" }
        ]
      }
    },
    "jobResponsibilities" : {
      "arrayValue" : {
        "values" : [
          {
            "stringValue" : "Responsibility 1"
          }
        ]
      }
    }
  },
  {
    "companyName" : { "stringValue" : "Procter & Gamble" },
    "position" : { "stringValue" : "Software Engineer" },
    "dateStart" : { "stringValue" : "2023-05-01" },
    "dateEnd" : { "stringValue" : "2024-09-13" },
    "location" : { "stringValue" : "Warsaw, Poland" },
    "logoUrl" : { "stringValue" : "https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg" },
    "technologies" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "Golang" },
          { "stringValue" : "Python" },
          { "stringValue" : "Terraform" },
          { "stringValue" : "GCP" },
          { "stringValue" : "BigQuery" },
          { "stringValue" : "Kubernetes" },
          { "stringValue" : "Apache Airflow" }
        ]
      }
    },
    "jobResponsibilities" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "Initiated, architected and developed Golang-based custom parsing solution for automatic modification of Terraform configuration files and exposed it to internal teams using a REST API. The API was consumed by the major P&G project 'AI Factory' for provisioning AI infrastructure in GCP." },
          { "stringValue" : "Developed a solution for monitoring BigQuery processing slot consumption across the P&G GCP environment. The project utilized Python, BigQuery, GCP's Apache Airflow (Cloud Composer), and Looker Studio. The solution was later used by Cloud Support teams to identify performance issues and resolve them faster." },
          { "stringValue" : "Guided application teams on best practices for deploying solutions on P&G's GCP platform. Reviewed and adjusted architectures, created CI/CD pipelines (Jenkins, Cloud Build, GitHub Actions), and developed Terraform configurations." },
          { "stringValue" : "Packaged GCP resources and reusable application architectures into Terraform modules for the later usage by application teams. Security and performance best practices were enforced in the modules delivered." }
        ]
      }
    }
  },
  {
    "companyName" : { "stringValue" : "DXC Technology" },
    "position" : { "stringValue" : "Data Engineer" }
    "dateStart" : { "stringValue" : "2023-01-16" },
    "dateEnd" : { "stringValue" : "2023-05-01" },
    "location" : { "stringValue" : "Warsaw, Poland" },
    "logoUrl" : { "stringValue" : "https://brandlogos.net/wp-content/uploads/2022/06/dxc_technology-logo_brandlogos.net_utsyy.png" },
    "technologies" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "Azure" }
        ]
      }
    },
    "jobResponsibilities" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "Developed and maintained Azure-based Data Pipelines for processing the stock/inventory data of a big FMCG Client. Pipelines were built by using Python, Azure Databricks, Apache Spark, Azure Datafactory and Synapse Analytics." },
          { "stringValue" : "Developed C# (.NET) based Azure Functions as part of major pipeline workflows for performing an additional data enrichment operations." },
          { "stringValue" : "Built CI/CD pipelines and automated tests for the Data Pipelines and Azure functions by making use of Azure DevOps Pipelines." },
          { "stringValue" : "Created Terraform configrations for the deployment of the new Data Processing clusters and Database Instances on Azure." }
        ]
      }
    }
  },
  {
    "companyName" : { "stringValue" : "Devoteam G Cloud" },
    "position" : { "stringValue" : "Cloud Support Engineer" },
    "dateStart" : { "stringValue" : "2022-05-01" },
    "dateEnd" : { "stringValue" : "2023-01-16" },
    "location" : { "stringValue" : "Warsaw, Poland" },
    "logoUrl" : { "stringValue" : "https://drive.google.com/file/d/1FtlphqVhq8HTTgsPFCDsyIV_hqZ9xGbq/view?usp=sharing" },
    "technologies" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "Python" },
          { "stringValue" : "Terraform" },
          { "stringValue" : "Google Cloud" }
      ] }
    },
    "jobResponsibilities" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "Initiated and developed a solution on top of the Google's open source project - 'gcpdiag', that was automatically comparing clients' infrastructure deployed in the GCP against the most common bad practices that could cause major issues. Results were automatically returned to the Support Engineer assigned to the ticket, which significantly assisted him with the further resolvement of the issue occured." },
          { "stringValue" : "Developed GCP Cloud Functions for automation of the manual routine tasks that were constantly performed in the Support Department." },
          { "stringValue" : "Served as a first line Support Engineer for the Clients with the Google Cloud based Infrastructure" },
        ]
      }
    }
  },
  {
    "companyName" : { "stringValue" : "Abbott" },
    "position" : { "stringValue" : "Intern DevOps/Data Engineer" },
    "dateStart" : { "stringValue" : "2021-12-01" },
    "dateEnd" : { "stringValue" : "2022-05-01" },
    "location" : { "stringValue" : "Warsaw, Poland" },
    "logoUrl" : { "stringValue" : "https://upload.wikimedia.org/wikipedia/commons/a/a4/Abbott_Laboratories_logo.svg" },
    "technologies" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "Python" },
          { "stringValue" : "AWS" },
          { "stringValue" : "Terraform" },
          { "stringValue" : "Apache Spark" }
      ] }
    },
    "jobResponsibilities" : {
      "arrayValue" : {
        "values" : [
          { "stringValue" : "Supported Abbott's internal Big-Data/AI AWS-based platform. Specifically, was responsible for debugging issues related to infrastructure provisioning, deployment and exploitation." },
          { "stringValue" : "Contributed to the data processing AWS Lambda functions and Apache Spark based ETL Glue Jobs" },
          { "stringValue" : "Developed AWS CloudFormation templates and Terraform configuration files for the AWS resources that were later utilized by the members of a Data Science team." },
          { "stringValue" : "Developed and integrated a custom Bash script into CodePipeline workflow, which was responsible for automated build and deployment of the AWS Cloud Functions across the Abbott's AWS environment." },
        ]
      }
    }
  }
] 