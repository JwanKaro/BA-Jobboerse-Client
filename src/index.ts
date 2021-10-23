import { Auth } from "BaArbeitClient/auth";
import { Actions} from 'BaArbeitClient/actions';
import { SearchParams } from "BaArbeitClient/actions/types";

export default class  BaArbeitClient {
    private auth: Auth;
    private actions: Actions | undefined;
    constructor() {
        this.auth = new Auth();
    }
    async init() {
        await this.auth.isAuthorized();
        this.actions = this.actions || new Actions(this.auth.token);
    }
    public async Search(params: SearchParams) {
        await this.init();
        if (!this.actions) throw new Error("Search was used before initialization.");
        return await this.actions.Search(params);
    }

}