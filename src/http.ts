import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type sucessResult<T> = {
    error: false,
    response: T,
    created_at: number
}

type failedResult = {
    error: true,
    response: undefined,
    reason: reason,
    created_at: number
}

type reason = {
    text: string,
    config: {
        url: string | undefined,
        data: any,
        params: any,
        method: string | undefined,
        headers: any
    }
}
module HttpClient {

    export const request = async <T>(options: AxiosRequestConfig) => {

        try {
            //@ts-ignore
            const res: AxiosResponse<T> = await axios(options);
            const response: sucessResult<T> = { error: false, response: res.data, created_at: ~~(Date.now() / 1000) }
            return response
        } catch (AxiosError) {
            const error: AxiosError = Object(AxiosError)
            const failedResponse: failedResult = {
                error: true, response: undefined,
                reason: {
                    text: error.message,
                    config: {
                        url: error.config.url,
                        data: error.config.data || null,
                        params: error.config.params? JSON.stringify(error.config.params) : null,
                        method: error.config.method,
                        headers: JSON.stringify(error.config.headers) || null,

                    }
                },
                created_at: ~~(Date.now() / 1000)
            }
            return failedResponse
        };
    }

    export const serialize = (obj: any) => {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };
}


export default HttpClient;