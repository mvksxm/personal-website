import Repository from "./repository";
import * as ff from "@google-cloud/functions-framework";
import { FunctionRequest, FunctionRequestSchema, WorkExperienceSchema, WorkExperienceType } from "./models";
import { DeserializeArray, ObjectDeserialize } from "./deserializers";
import { DocumentSnapshot } from "@google-cloud/firestore";

// Global Vars
const PROJECT_ID: string = process.env["project_id"] ? process.env["project_id"] : "marine-catfish-310009";
const DATABASE_ID: string = process.env["database_id"] ? process.env["database_id"] : "personal-database"
const SUPPORTED_COLLECTIONS = [
  "workExperience",
  "personalProjects"
]

// Repo definition
let rep = new Repository(
  PROJECT_ID,
  DATABASE_ID,
  SUPPORTED_COLLECTIONS
)

const ApplyCollectionType = (documentData: DocumentSnapshot | Array<DocumentSnapshot>, collectionName: string): object[] => {

  let resultArray: object[] = []

  if (!SUPPORTED_COLLECTIONS.includes(collectionName)) {

    // Not implemented
    throw new Error("Not implemented.")
  }
  
  if (collectionName == "workExperience") {

    if (documentData instanceof DocumentSnapshot) {
      resultArray.push(ObjectDeserialize<WorkExperienceType>(documentData, WorkExperienceSchema))
    }

    if (documentData instanceof Array) {
      resultArray = DeserializeArray<WorkExperienceType>(documentData, WorkExperienceSchema)
    }

  }

  if (collectionName == "personalProjects") {

    // Not implemented
    throw new Error("Not implemented.")
  }
  
  return resultArray;
}

// Testing
// rep.ListCollectionDocuments("workExperience").then((docs => {
//    let workExpDocs: Array<WorkExperienceType> = DeserializeArray<WorkExperienceType>(docs, WorkExperienceSchema)
//    for (let doc of workExpDocs) {
//     console.log(doc.companyName)
//    }
// }))

// rep.GetDocumentById("workExperience", "QWJib3R0").then((doc) => {
//   let workExp: WorkExperienceType = ObjectDeserialize<WorkExperienceType>(doc, WorkExperienceSchema)
//   console.log(workExp.companyName)
// })


ff.http("PersonalFunction", async (req, res) => {

  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  
  if (req.method === "OPTIONS") {
    res.status(204).send('');
    return
  }

  try {

    let rawRequest = req.rawBody?.toString(); 
  
    if (!rawRequest) {
      throw new Error("Request's body is empty!")
    }

    let deserializedReq = ObjectDeserialize<FunctionRequest>(rawRequest, FunctionRequestSchema);
          
    // if (!deserializedReq.collectionName) {
    //   throw new Error("Obligatory parameter - 'collectionName' is empty!")
    // }  
    
    if (!deserializedReq.isList && !deserializedReq?.documentId) {
      throw new Error("If 'isList' parameters is - 'False', then 'documentId' must be supplied!")
    } 
    
    let functionResponse: object[];
    if (!deserializedReq.isList && deserializedReq.documentId) {
      let documentSnap = await rep.GetDocumentById(deserializedReq.collectionName, deserializedReq.documentId)
      functionResponse = ApplyCollectionType(documentSnap, deserializedReq.collectionName)
    } else {
      let documentSnaps = await rep.ListCollectionDocuments(deserializedReq.collectionName)
      functionResponse = ApplyCollectionType(documentSnaps, deserializedReq.collectionName)
    }

    res.send(functionResponse)
  } 
  catch (error) {
    console.log("Error occured during an execution of the function!")
    
    var err = error as Error;
    console.log(err.message)
    
    // throw error;
    res.status(400).send({"Error": err.message})
  }

}
)




