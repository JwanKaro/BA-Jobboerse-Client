import { TokenObjectInterface } from "BaArbeitClient/types";



export class TokenObject {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    scope: Array<string>;
    clientId: string;
    constructor({ accessToken, tokenType, scope, clientId }: TokenObjectInterface) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.expiresIn = TokenObject.decodeAccessToken(accessToken).exp;
        this.scope = scope;
        this.clientId = clientId;
    }
    isExpired(): boolean {
        return (this.expiresIn - 60) < ~~(Date.now() / 1000);
    }
    static decodeAccessToken(accessToken: string) {
        const token = Buffer.from(accessToken.split(".")[1], "base64")
        return JSON.parse(token.toString());
    }
}