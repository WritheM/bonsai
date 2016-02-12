import { Action } from "../Constants";

export function toggleMenu() {
    return { type: Action.UI.TOGGLE_MENU };
}

export function exitOverlay() {
    return { type: Action.UI.EXIT_OVERLAY };
}