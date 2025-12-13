import { CollectionReference, DocumentSnapshot, Firestore } from "@google-cloud/firestore";


class Repository {
    
    
    private projectId: string;
    private databaseId: string;
    private firestoreClient: Firestore; 
    private observedCollection: CollectionReference;
    

    constructor(projectId: string, databaseId: string) {
        this.projectId = projectId;
        this.databaseId = databaseId;
        this.firestoreClient = new Firestore(
            {
                projectId: projectId,
                databaseId: databaseId
            }
        )

        // Default collection that is chosen for the init purposes.
        this.observedCollection = this.firestoreClient.collection("workExperience")
    } 

    private reInitCollection(collectionPath: string) {
        let currCollectionPath = this.observedCollection?.path;
        if (currCollectionPath === null || currCollectionPath != collectionPath) {
            this.observedCollection = this.firestoreClient.collection(collectionPath);
        }  
        return;
    }

    public async ListCollectionDocuments(collectionPath: string): Promise<Array<DocumentSnapshot>> {
        this.reInitCollection(collectionPath);
        let documentRefs = await this.observedCollection.listDocuments()
        return await this.firestoreClient.getAll(...documentRefs);
    }

    public async GetDocumentById(collectionPath: string, documentId: string): Promise<DocumentSnapshot> {
        let documentRef =this.firestoreClient.doc(`${collectionPath}/${documentId}`);
        return await documentRef.get();
    }

}

export default Repository