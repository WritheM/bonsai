// Examples from Redux Documentation:
// https://rackt.org/redux/docs/advanced/Middleware.html

/**
 * Logs all actions and states after they are dispatched.
 */
export const logger = store => next => action => {
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