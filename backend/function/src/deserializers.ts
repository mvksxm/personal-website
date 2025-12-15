import { DocumentSnapshot } from "@google-cloud/firestore";
import { ZodError, ZodObject } from "zod";


const DeserializeArray = <T>(data: Array<DocumentSnapshot>, validator: ZodObject): Array<T> => { 
    let resultArray: Array<T> = new Array();
    for (let d of data) {
        let result = validator.safeParse(d.data())
        if (result.success) {
          resultArray.push(result.data as T)
        } else {
          console.log(result.error.message)
        }
    }
    return resultArray;

    // if (Array.isArray(data) && data.every(d => d instanceof DocumentSnapshot)) {
    //   let resultArray: Array<T> = new Array();
    //   for (let d of data) {
    //       let result = validator.safeParse(d.data())
    //       if (result.success) {
    //         resultArray.push(result.data as T)
    //       }
    //   }
    //   return resultArray;
    // }

}

const ObjectDeserialize = <T>(data: DocumentSnapshot | string, validator: ZodObject): T => {

  try {

    let objectData: object = {};

    // Handling a string type data.
    if (typeof data === "string") {
      objectData = JSON.parse(data);
    }

    // Handling a Document Snapshot type data.
    if (data instanceof DocumentSnapshot) {
      objectData = data.data()!;
    }

    validator.parse(objectData)
    return objectData as T
  }
  catch (error) {
    if (error instanceof SyntaxError) {
      console.log(`Problem occured when deserializing the following string data - ${data}`)
    }

    if (error instanceof ZodError) {
      console.log(`Problem occured when deserializing the data by using Zod framework - ${error.message}`)
    }

    throw error;
  }
}

export {
    ObjectDeserialize,
    DeserializeArray
}