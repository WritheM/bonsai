import {
    ActionTypes
}                           from "../constants";

import {
    dictReducer
}                           from "./helpers";

function reduceSessionAttach(connection, action) {
    if (connection.id !== action.id) {
        return null;
    }

    var a = {
        ...connection,
        session: action.session,
        user: action.user
    };

    return a;
}

function reduceSessionDetach(connection, action) {
    if (connection.id !== action.id) {
        return null;
    }

    return {
        ...connection,
        session: null,
        user: null
    };
}

function connectionCollectionFactory(state, action) {
    switch(action.type) {
        case ActionTypes.CONNECTION_OPEN:
            return [{
                id: action.id,
                session: action.session,
                user: action.user
            }];
        default:
            return [];
    }
}


function connectionCollectionItemReducer(connection, action) {
    switch(action.type) {
        case ActionTypes.CONNECTION_ATTACH:
            return reduceSessionAttach(connection, action);
        case ActionTypes.CONNECTION_DETACH:
            return reduceSessionDetach(connection, action);
        default:
            return null;
    }
}

function connectionCollectionFilter(connection, action) {
    switch(action.type) {
        case ActionTypes.CONNECTION_CLOSE:
            // Keep it if it's not the item in the action
            return connection.id != action.id;
        default:
            return true;
    }
}

const connections = dictReducer(
    connectionCollectionFactory,
    connectionCollectionItemReducer,
    connectionCollectionFilter
);

export default connections;
