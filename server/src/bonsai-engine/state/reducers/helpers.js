import * as _ from "lodash";

function dictItemReducer(updateReducer, item, action) {
    let reducedItem = updateReducer(item, action);
    if (reducedItem) {
        return reducedItem;
    }

    return {...item}; // TODO: Shallow copy perhaps needs to be a deep copy?
}

function dictAddReducer(addReducer, state, action) {
    return _.filter(addReducer(state, action) || [], item => !!item);
}

/**
 * Creates a collection reducer.
 *
 * @param factory A factory method that returns a collection of items to add based on the provided action.
 * @param itemReducer A reducer that returns an updated item based on the provided action.
 * @param itemFilter A filter for keeping values around based on an action, used to remove items.
 * @param initialState (Optional) The Initial state to initialize with if the state option is not provided.
 * @returns {dictReducerImpl} A collection reducer method.
 */
export function dictReducer(factory, itemReducer, itemFilter, initialState = {}) {
    return function dictReducerImpl(state = initialState, action) {

        // Remove anything that matches the remove key filter
        var afterRemoved = _
            .filter(state, item => itemFilter(item, action));

        var afterUpdated = _
            .map(afterRemoved, item => dictItemReducer(itemReducer, item, action));

        // Due to concat coming last, new should always win in the
        // case of an ID conflict.
        var afterAdded = afterUpdated
            .concat(dictAddReducer(factory, state, action));

        return _
            // Remove anything that isn't truthy or that doesn't have a
            // id field.
            .filter(afterAdded, item => !!item && !!item.id)
            // Reduce it down into a key/value mapping based on id.
            .reduce((prev, item) => {
                prev[item.id] = item;
                return prev;
            }, {});
    };
}