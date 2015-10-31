import * as Constants from "../Constants"

export default class UIActions {

    toggleMenu() {
        this.dispatch();
    }

    updatePageComponent(component) {
        this.dispatch({
            component: component
        });
    }

}