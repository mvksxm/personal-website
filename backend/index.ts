import Repository from "./Repository";

// Global Vars
const PROJECT_ID: string = process.env["project_id"] ? process.env["project_id"] : "marine-catfish-310009";
const DATABASE_ID: string = process.env["database_id"] ? process.env["database_id"] : "personal-database"


let rep = new Repository(
  PROJECT_ID,
  DATABASE_ID
)


rep.ListCollectionDocuments("workExperience").then((docs => {
   for (let doc of docs) {
    if (doc.exists) {
      console.log(doc.data())
    }
   }
}))


// const functions = require('@google-cloud/functions-framework');

// functions.http('personalBackendService', (req, res) => {

//   res.send('Hello, World!');
// });




