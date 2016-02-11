///////////////////////////////////////////////
// User Reducer

import { combineReducers }      from "redux";

import {
    Action,
    SocialPaneStates
}                               from "../Constants";

const collectionDefaults = [
    {
        id: 0,
        username: "Guest",
        displayname: "Guest"
    }
];

function collection(state = collectionDefaults, action) {
    let clone = state.map(x => ({...x}));

    switch(action.type) {
        case Action.Session.UPDATE:
            let user = action.user;
            clone.push({...user});
            return clone;
        default:
            return clone;
    }
}

const currentDefaults = {
    id: 0,
    isGuest: true,
    isLoggedIn: false
};

function current(state = currentDefaults, action) {
    switch(action.type) {
        case Action.Session.UPDATE:
            let id = action.user
                ? action.user.id
                : 0;

            let isGuest = id === 0;

            return {
                id,
                isGuest,
                isLoggedIn: !isGuest
            };
        default:
            return {...state};
    }
}

export default combineReducers({
    collection,
    current
});