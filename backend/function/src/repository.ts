import { CollectionReference, DocumentData, DocumentSnapshot, Firestore, FirestoreDataConverter } from "@google-cloud/firestore";


class Repository {
    
    
    private projectId: string;
    private databaseId: string;
    private firestoreClient: Firestore; 
    private observedCollection: CollectionReference;

    // private collectionsConfig = {
    //     "workExperience": {
    //         "desFunction": this.documentConverter<WorkExperienceResponse> 
    //     }
    // }
    private supportedCollections: Array<string>;

    constructor(projectId: string, databaseId: string, supportedCollections: Array<string>) {
        this.projectId = projectId;
        this.databaseId = databaseId;
        this.firestoreClient = new Firestore(
            {
                projectId: projectId,
                databaseId: databaseId
            }
        )
        this.supportedCollections = supportedCollections;

        // Default collection that is chosen for the init purposes.
        this.observedCollection = this.firestoreClient.collection("workExperience")
                                                    //   .withConverter
                                                    //   (
                                                    //     this.collectionsConfig["workExperience"]["desFunction"]()
                                                    //   );
    }

//     private documentConverter<T extends object>() : FirestoreDataConverter<T> {
//         return {
//             toFirestore(item: T): DocumentData {
//                 return { ...item };
//             },
        
//             fromFirestore(snapshot): T {
//                 return snapshot.data() as T;
//             }
//         };
//   }

    private validateCollectionPath(collectionPath: string): boolean {
        let pathRegex = new RegExp("^[a-zA-Z]+(\/[a-zA-Z]+)*$")
        return pathRegex.test(collectionPath) && this.supportedCollections.includes(collectionPath) 
    }

    private reInitCollection(collectionPath: string) {
        
        if (!this.validateCollectionPath(collectionPath)) {
            throw new Error(`Collection id provided - ${collectionPath} is invalid!`)
        }

        let currCollectionPath = this.observedCollection?.path;
        if (currCollectionPath === null || currCollectionPath != collectionPath) {
            this.observedCollection = this.firestoreClient
                                          .collection(collectionPath)
                                        //   .withConverter
                                        // (
                                        //     this.collectionsConfig["workExperience"]["desFunction"]() 
                                        // );
        }  
        return;
    }

    public async ListCollectionDocuments(collectionPath: string): Promise<Array<DocumentSnapshot>> {
        this.reInitCollection(collectionPath);
        let documentRefs = await this.observedCollection.listDocuments();
        
        if (documentRefs.length === 0) {
            throw new Error(`Collection - ${collectionPath} is empty!`);
        }

        return await this.firestoreClient.getAll(...documentRefs);
    }

    public async GetDocumentById(collectionPath: string, documentId: string): Promise<DocumentSnapshot> {
        this.reInitCollection(collectionPath);
        let documentSnapshot = await this.observedCollection.doc(documentId).get();
        
        if (!documentSnapshot.exists) {
            throw new Error(`Document with the following id - ${documentId} , does not exist in the provided collection - ${collectionPath}`)
        }

        return documentSnapshot;
    }

}

export default Repository