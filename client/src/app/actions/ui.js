import { Action } from "../Constants";

export function toggleMenu() {
    return { type: Action.UI.TOGGLE_MENU };
}
