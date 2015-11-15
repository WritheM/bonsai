import * as Constants   from "../Constants"
import Handler          from "./Handler"

export default class SessionHandler extends Handler {
    constructor(flux) {
        super(flux);

        this.sessionActions = this.getActions(Constants.Actions.SESSION);
    }

    attach() {
        this.on('Session:update', this.onUpdate);
    }

    onUpdate(payload) {
        this.sessionActions.update(
            payload.user,
            payload.session,
            payload.perms
        );
    }

}
