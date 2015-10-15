import * as Constants from "../Constants"

export default class SessionStore {

    constructor() {

        var uiActions = this.alt.getActions(Constants.Actions.UI);

        this.menu = {
            isVisible: false,
            isOpen: false
        };

        this.social = {
            isVisible: false,
            isOpen: false
        };

        this.socialPane = {
            isVisible: false,
            mode: Constants.SocialPaneStates.COMPACT
        };

        this.bindListeners({
            handleToggleMenu: uiActions.toggleMenu
        });

    }

    handleToggleMenu() {
        this.menu.isOpen = !this.menu.isOpen;
    }

}