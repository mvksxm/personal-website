import axios from "axios";

class Requestor {

    private lStorage: Storage;
    private url: string; 
    private headers: object;
    private cacheKey: string;
    
    constructor(url: string, cacheKey: string = "mtPersonal", headers: object = {}) {
        this.url = url
        this.lStorage = window.localStorage
        this.headers = headers
        this.cacheKey = cacheKey
    }

    private isEmptyObject(data: object): boolean {
        return Object.keys(data).length === 0
    } 

    private cacheData(toCache: object, timeSet: number) {
        let cacheData = {
            timeSet: timeSet,
            ...toCache
        }
        console.log("Caching....")
        this.lStorage.setItem(this.cacheKey, JSON.stringify(cacheData))
    }

    public async postRequest<T>(data: object, headers: object = {}): Promise<T> {
        try {
            if (this.isEmptyObject(data)) {
                throw new Error("Object provided is Empty!")
            }
            
            let timeNow: number = Date.now()
            let cachedResponse = this.lStorage.getItem(this.cacheKey)
            let cachedResponseObject = cachedResponse ? JSON.parse(cachedResponse) : null

            if (cachedResponseObject && timeNow - cachedResponseObject.timeSet < 60*60*1000 ) {
                console.log("Cache hit!")
                delete cachedResponseObject.timeSet
                return cachedResponseObject as T
            }
            
            let resp = await axios.post(
                this.url, 
                data, 
                this.isEmptyObject(headers) ? this.headers : headers
            )

            if (resp.status !== 200) {
                console.error(`Endpoint - ${this.url} returned the following error status code - ${resp.status}!`)
                throw new Error(`Endpoint - ${this.url} returned the following error status code - ${resp.status}!`)
            } else if (resp.data === null) {
                console.error(`Empty data was returned from the following url - ${this.url}!`)
                throw new Error(`Empty data was returned from the following url - ${this.url}!`)
            }
            
            this.cacheData(resp.data, timeNow)
            return resp.data as T

            
        } catch(err) {
            throw err;
        }
    }
}

export default Requestor;