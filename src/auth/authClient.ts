export default class AuthClient {
    private clientId: string;
    private clientSecret: string;
    private authServerUrl: string;
    constructor() {
        if (!process.env.BA_CLIENT_ID ||
            !process.env.BA_CLIENT_SECRET ||
            !process.env.BA_HOST_AUTH
        )
            throw new Error("configure the environment properly");

        this.clientId = process.env.BA_CLIENT_ID
        this.clientSecret = process.env.BA_CLIENT_SECRET
        this.authServerUrl = process.env.BA_HOST_AUTH
    }

    id() {
        return this.clientId
    }
    secret() {
        return this.clientSecret
    }
    getAuthURL(): string {
        return this.authServerUrl
    }

}