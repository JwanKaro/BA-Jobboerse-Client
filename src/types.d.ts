import { Method } from 'axios';
export interface TokenObjectInterface {
    accessToken: string;
    tokenType: string;
    scope: string[];
    clientId:string;
}

