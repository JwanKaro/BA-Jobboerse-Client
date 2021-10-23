import { TokenObject } from "BaArbeitClient/auth/token";
import HttpClient from "BaArbeitClient/http";
import { ActionRequest } from "BaArbeitClient/actions/types";

export async function request<T>({ url, method, data }: ActionRequest, token: TokenObject) {
    return await HttpClient.request<T>({
        url: url,
        method: method,
        params: data,
        headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`,
            "User-Agent": "NOX",
        }
    })
}