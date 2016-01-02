// Controllers
import SessionController from "./client/SessionController";

/**
 * Instantiates a new array of controller instances.
 * @returns {*[]}
 */
export function getDefaultControllers(models) {
    return [
        new SessionController(models)
    ];
}