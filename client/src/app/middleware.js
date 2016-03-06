// Examples from Redux Documentation:
// https://rackt.org/redux/docs/advanced/Middleware.html

import {
    Action,
    NoisyActions
}                       from "./Constants";

/**
 * Logs all actions and states after they are dispatched.
 */
export const logger = store => next => action => {

    // Ignore noisy actions, we don't want
    // to overload ourselves.
    if (NoisyActions[action.type]) {
        return next(action);
    }

    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result

};

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
export const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err);

        throw err;
    }
};

function apiMiddlewareCall(context, action) {
    let { api } = context;
    
    let {
        module,
        method,
        args,
        onSuccess,
        onFailure
    } = action;

    if (!module || !method) {
        throw new Error("Api Calls must specify at least a module / method.");
    }

    let apiModule = api[module];
    if (!apiModule) {
        throw new Error(`Cannot find API module '${module}'.`);
    }

    let apiMethod = apiModule[method];
    if (!apiMethod || typeof apiMethod !== "function") {
        throw new Error(`Invalid API method '${method}' on module '${module}'.`);
    }

    apiMethod
        .apply(apiModule, args)
        .then(
            result => {
                if (typeof onSuccess === "function") {
                    onSuccess(result, context);
                }
            },
            error => {
                if (typeof onFailure === "function") {
                    onFailure(error, context);
                }
            });
}

function apiMiddlewareCallback(context, action) {
    let {
        callback
    } = action;

    if (typeof callback !== "function") {
        throw new Error("Api Callback must be a function.");
    }

    callback(context);
}

/**
 * Creates a middleware that intercepts api actions and maps them
 * into the provided api instance.
 */
export const createApiMiddleware = api => store => next => action => {
    let context = {
        api,
        dispatch: store.dispatch,
        getState: store.getState
    };

    if (action.type === Action.API.CALL) {
        return apiMiddlewareCall(context, action);
    }

    if (action.type === Action.API.CALLBACK) {
        return apiMiddlewareCallback(context, action);
    }

    return next(action);
};