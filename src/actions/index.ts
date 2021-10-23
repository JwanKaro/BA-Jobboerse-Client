import { TokenObject } from '../auth/token';
import { SearchParams, ActionRequest } from "./types";
import { request } from './functions';
import { Search } from './search';






// class Job {
//     token: TokenObject;
//     id: string;
//     server = process.env.JOB_SERVER;
//     private _rawJob?: JobApiResponse;
//     company: Company;
//     constructor(Token: TokenObject, hashId: string) {
//         this.token = Token
//         this.id = hashId
//     }
//     async fetch() {
//         const req = await this.request({
//             url: "https://api-con.arbeitsagentur.de/prod/jobboerse/jobsuche-service/pc/v1/jobdetails/" + this.id,
//             method: "GET",
//         })

//         if (req.error) {
//             throw new Error(req.reason.text)
//         }

//         this._rawJob = req.response;
//         this.company = new Company()
//     }
//     private async request(req: ActionRequest) {
//         return await request<JobApiResponse>(req, this.token);
//     }


//     public get() {
//         if (this._rawJob) {
//             this._rawJob.eintrittsdatum
//             this._rawJob.branchenbezeichnung
//             this._rawJob.betriebsgroesse
//         }
//     }
//     get description(){}
//     get officalName(){}
//     get customName(){ }
//     get refrenseNumber(){}
//     get multipleLocations( ){}
//     get type(){}
//     get anonymous(){}
//     get releaseDate(){}
//     get workingTimeModule(){}
//     get 

// }

// class Company{

//     get companyName(){}
//     get companyId(){}
//     get companyLogo(){}
// }


export class Actions {
    token: TokenObject;
    constructor(token: TokenObject) {
        this.token = token;
    }

    async request(req: ActionRequest) {
        return await request(req, this.token);
    }
    Search = (params: SearchParams)=>Search(this.token,params)

    // Job(hashId: string) {
    //     return new Job(this.token, hashId);
    // }
}

