///////////////////////////////////////////////
// Queue Reducer

import { combineReducers }      from "redux";

import {
    Action,
    SocialPaneStates
}                               from "../Constants";

const menuDefaults = {
    isVisible: true,
    isOpen: false
};

function menu(state = menuDefaults, action) {
    switch(action.type) {
        case Action.UI.TOGGLE_MENU:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        default:
            return {...state};
    }
}

const socialDefaults = {
    isVisible: true,
    isOpen: false
};

function social(state = socialDefaults, action) {
    return {...state};
}

const socialPaneDefaults = {
    isVisible: false,
    mode: SocialPaneStates.COMPACT
};

function socialPane(state = socialPaneDefaults, action) {
    return {...state};
}

export default combineReducers({
    menu,
    social,
    socialPane
});