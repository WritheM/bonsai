///////////////////////////////////////////////
// Root Reducer

import { combineReducers } from "redux";

import player           from "./player";
import queue            from "./queue";
import session          from "./session";
import systemReducer    from "./system";
import ui               from "./ui";
import user             from "./user"

export default combineReducers({
    player,
    queue,
    session,
    system: systemReducer,
    ui,
    user
});
