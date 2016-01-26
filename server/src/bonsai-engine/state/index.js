import { createStore } from "redux";

// Reducers
import connections      from "./reducers/connections";

// Other
import * as elements    from "./elements";

// Single Modules
import Tracker          from "./Tracker";

const initialRootState = {
    connections: {}
};

// TODO: Replace with combineReducers when there are more
function masterReducer(state, action) {
    return {
        connections: connections(state.connections, action)
    };
}

function newStore(initialState = initialRootState) {
    return createStore(
        masterReducer,
        initialState
    );
}

export {
    Tracker,
    elements,

    newStore
};