import { request } from "BaArbeitClient/actions/functions";
import {
    ContractPeriod,
    JobSearchType,
    SearchParams,
    SearchResponse,
    WorkingTime
} from "BaArbeitClient/actions/types";
import { TokenObject } from 'BaArbeitClient/auth/token';




class QueryBuilder {
    query: any = {};

    constructor() { }
    queryBuilder = (params: SearchParams) => {
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                //@ts-ignore  
                const param = params[key];
                //@ts-ignore  
                if (this[key] !== undefined)
                    //@ts-ignore    
                    this[key](param)
            }
        }

        return this.query
    }

    private title(title: string) {
        this.query["was"] = title;
    }
    private location(location: string) {
        this.query["wo"] = location;
    }
    private maxJobs(maxJobs: number) {
        var val = maxJobs
        if (maxJobs > 100)
            val = 100;
        if (maxJobs <= -1)
            val = 0
        this.query["size"] = val;
    }
    private publishedWithIn(value: number) {
        var val = value
        if (value > 100)
            val = 100;
        if (value <= -1)
            val = 0
        this.query["veroeffentlichtseit"] = val;
    }
    private thirdPartyResources(value: boolean) {
        if (!value) this.query['pav'] = value
    }
    private type(type: JobSearchType) {
        const types = {
            job: 1,
            selfReliance: 2,
            internship: 4,
            trainee: 34
        }
        this.query["angebotsart"] = types[type] || types.job

    }
    private contractPeriod(types: ContractPeriod) {
        Object.values(types).forEach((type) => {
            this.query["befristung"] = type
        })
    }
    private disabilityFrendliy(value: boolean) {
        if (value) this.query["behinderung"] = value
    }
    private coronaAction(value: boolean) {
        if (value) this.query["corona"] = value
    }
    private radiusOfLocation(value: number) {
        var val = value
        if (value > 200)
            val = 200;
        if (value <= -1)
            val = 0
        this.query["umkreis"] = val
    }
    private workingTime(types: WorkingTime) {
        const allowedPrarms = {
            fullTime: "vz",
            partTime: "tz",
            weekends: "snw",
            homeoffice: "ho",
            miniJob: "mj",
        }
        var params: String[] = []
        Object.keys(types).forEach((type) => {
            //@ts-ignore
            if (allowedPrarms[type]) params.push(allowedPrarms[type])
        })
        if (params.length > 0) {
            this.query["arbeitszeit"] = ""
            params.forEach((v, i) => {
                this.query["arbeitszeit"] += params[i + 1] == undefined ? v : v + ";"
            })
        }
    }
}


export async function Search(token: TokenObject, params: SearchParams) {
    const queryBuilder = (new QueryBuilder()).queryBuilder
    const query = queryBuilder(params)
    const req = await request<SearchResponse>({
        url: "https://api-con.arbeitsagentur.de/prod/jobboerse/jobsuche-service/pc/v4/jobs",
        method: "GET",
        data: query
    }, token)
    if (process.env.NODE_ENV !== "production" && req.error) {
        console.log("request failed", req);
    }
    return req.error ? req.reason.text : req.response
}
