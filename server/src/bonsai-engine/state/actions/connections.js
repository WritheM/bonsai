import {
    ActionTypes
}                       from "../constants";

export const open               = id => ({ type: ActionTypes.CONNECTION_OPEN, id });
export const close              = id => ({ type: ActionTypes.CONNECTION_CLOSE, id });

export const attachSession      = (connection, session, user) => ({
    type: ActionTypes.CONNECTION_ATTACH,
    id: connection,
    session,
    user
});

export const detachSession      = (id) => ({
    type: ActionTypes.CONNECTION_DETACH,
    id
});
