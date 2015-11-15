import * as Constants from "../Constants"

export default class UserStore {

    constructor() {

        let sessionActions       = this.alt.getActions(Constants.Actions.SESSION);

        this.users = {
            0: {
                id: 0,
                username: 'Guest',
                displayname: 'Guest'
            }
        };

        this.current = 0;
        this.isGuest = true;
        this.isLoggedIn = false;

        this.bindListeners({
            // Session
            handleUpdate: sessionActions.update
        });
    }

    calculate() {
        this.isGuest = this.current === 0;
        this.isLoggedIn = !this.isGuest;
    }

    handleUpdate(payload) {

        let {user} = payload;

        this.current = user.id || 0;
        this.users[user.id] = user;

        this.calculate();

    }

}