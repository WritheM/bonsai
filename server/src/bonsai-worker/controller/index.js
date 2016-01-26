// Controllers

import UserController from "./client/UserController";
import SessionController from "./client/SessionController";


/**
 * Instantiates a new array of controller instances.
 * @returns {*[]}
 */
export function getDefaultControllers(tracker, models) {
    return [
        new UserController(tracker, models),
        new SessionController(tracker, models)
    ];
}