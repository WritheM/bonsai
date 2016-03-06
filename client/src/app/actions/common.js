/////////////////////////////////////////////
// Global Actions
//
// Note: This may be imported by other action creators

import {
    Action
}                       from "../Constants";

/**
 * Call a method on an api module.
 * @param module The module to lookup.
 * @param method The module method to execute.
 * @param arguments The arguments to pass to the api method.
 * @param onSuccess The success handler .
 * @param onFailure The failure handler.
 *
 * @returns {{type: string, module: *, method: *, arguments: *, onSuccess: *, onFailure: *}}
 */
export function apiCall(
    module,
    method,
    args,
    onSuccess,
    onFailure
) {
    return {
        type: Action.API.CALL,
        module,
        method,
        args,
        onSuccess,
        onFailure
    };
}