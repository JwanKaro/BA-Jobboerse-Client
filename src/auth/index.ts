import HttpClient from 'BaArbeitClient/http';
import { TokenObject } from 'BaArbeitClient/auth/token';
import AuthClient from 'BaArbeitClient/auth/authClient';
import Juin from 'juin';


export interface TokenResponse {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    clientid: string,
    type: string,
    created_at: number,
}

/**
 * Compares two object keys 
 * @param {object} a 
 * @param {object} b 
 * @returns {Boolean}
 */
function cmpKeys(a: object, b: object): Boolean {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}
export class Auth {
    client = new AuthClient();
    token!: TokenObject;
    Storage = new Juin.Storage.Persistence("./noxStorage.STD")
    constructor() {

    }

    private clientEncoded(): string {
        return HttpClient.serialize(
            {
                "client_id": this.client.id(),
                "client_secret": this.client.secret(),
                "grant_type": "client_credentials"
            })
    }

    /**
   * sends authorization request to the Bundesagentur server  
   * @returns {Promise<failedResult | sucessResult<TokenResponse>>} Response
   */
    private async authorizeRequest() {
        const res = await HttpClient.request<TokenResponse>(
            {
                url: this.client.getAuthURL(),
                data: this.clientEncoded(),
                method: 'POST'
            }

        )
        return res

    }
    /**
     * Process the authorization request
     * @param {boolean} override overrides the locally stored token 
     */
    async authorize(override: boolean = false): Promise<void> {

        if (override == true && this.loadStoredTokens())
            return;
        const res = await this.authorizeRequest()

        if (res.error) throw new Error(res.reason.text);
        this.token = new TokenObject(
            {
                accessToken: res.response.access_token,
                scope: res.response.scope.split(", "),
                tokenType: res.response.token_type,
                clientId: res.response.clientid,
            });

        if (!this.storeToken()) console.error("Error while saving token");


    }
    async isAuthorized() {
        if (!this.token || (this.token && (this.token.isExpired() == true))) {
            try {
                await this.authorize()
                return true
            } catch (error) {
                console.log(error);
                return false
            }

        }
        return true
    }


    private loadStoredTokens() {
        const tokens = this.Storage.getItem("TOKEN")
        if (!tokens || !process.env.BA_ENCRYPTION_KEY)
            return false
        const token: TokenObject = JSON.parse(tokens);
        const expectedToken = {
            expiresIn: "string",
            tokenType: "string",
            scope: "string",
            clientId: "string",
            accessToken: ""
        };


        if (cmpKeys(expectedToken, token) == false)
            return this.authorize(true)

        const Token = new TokenObject({ ...token })

        if (Token.isExpired() || Token.clientId !== this.client.id())
            return this.authorize(true)
        this.token = Token

        return true;
    }

    private storeToken() {
        if (!this.token)
            return false;
        if (!process.env.BA_ENCRYPTION_KEY)
            throw new Error("No RSA key was found in the environment. Please generate one.");
        this.Storage.setItem("TOKEN", JSON.stringify(this.token));
        return true;
    }

}