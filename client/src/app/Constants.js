/**
 * Action Collections (Namespaces)
 */
export const Actions = {
    PLAYER:     'ACTIONS_PLAYER',
    QUEUE:      'ACTIONS_QUEUE',
    SESSION:    'ACTIONS_SESSION',
    SYSTEM:     'ACTIONS_SYSTEM',
    UI:         'ACTIONS_UI'
};

export const Api = {
    Session: {
        LOGIN: "Session:login",
        LOGIN_TOKEN: "Session:loginToken",
        REGISTER: "Session:register",
        LOGOUT: "Session:logout"
    }
};

export const Action = {
    API: {
        CALL: "ACTION::API::CALL",
        CALLBACK: "ACTION::API:CALLBACK"
    },
    Player: {
        PLAY: "ACTION::PLAYER::PLAY",
        PAUSE: "ACTION::PLAYER::PAUSE",
        PLAY_PAUSE: "ACTION::PLAYER::PLAY_PAUSE",
        NEXT_ANCHOR: "ACTION::PLAYER::NEXT_ANCHOR",
        UPDATE_POSITION: "ACTION::PLAYER::UPDATE_POSITION",
        UPDATE_MODE: "ACTION::PLAYER::UPDATE_MODE",
        UPDATE_LOCATION: "ACTION::PLAYER::UPDATE_LOCATION"
    },
    Queue: {
        PLAY_SONG: "ACTION::QUEUE::PLAY_SONG"
    },
    Session: {
        UPDATE_SESSION: "ACTION::SESSION::UPDATE_SESSION",
        REGISTER_UPDATE_VIEW: "ACTION::SESSION::REGISTER_UPDATE_VIEW",
        LOGIN_UPDATE_VIEW: "ACTION::SESSION::LOGIN_UPDATE_VIEW",
        UPDATE: "ACTION::SESSION::UPDATE"
    },
    System: {
        INITIALIZE: "ACTION::SYSTEM::INITIALIZE",
        CONNECTION_STATE_CHANGED: "ACTION::SYSTEM::CONNECTION_STATE_CHANGED",
        CONNECTION_ERROR: "ACTION::SYSTEM::CONNECTION_ERROR"
    },
    UI: {
        EXIT_OVERLAY: "ACTION::UI::EXIT_OVERLAY",
        TOGGLE_MENU: "ACTION::UI::TOGGLE_MENU"
    }
};

export const NoisyActions = [
    Action.Player.UPDATE_POSITION
].reduce((lookup, key) => {
    lookup[key] = true;
    return lookup;
}, {});

export const Stores = {
    PLAYER:     'STORES_PLAYER',
    QUEUE:      'STORES_QUEUE',
    SESSION:    'STORES_SESSION',
    SYSTEM:     'STORES_SYSTEM',
    UI:         'STORES_UI',
    USER:       'STORES_USER'
};

export const Handlers = {
    SESSION:    'HANDLERS_SESSION'
};

/**
 * Connection States for the application socket
 */
export const ConnectionStates = {
    NOT_CONNECTED:  'NOT_CONNECTED',
    CONNECTING:     'CONNECTING',
    CONNECTED:      'CONNECTED'
};

export const SessionState = {
    ANONYMOUS:      'ANONYMOUS',
    AUTHENTICATED:  'AUTHENTICATED'
};

export const RegisterStates = {
    NONE:           'NONE',
    OPEN:           'OPEN',
    REGISTERING:    'REGISTERING',
    CONFIRMING:     'CONFIRMING'
};

export const LoginStates = {
    NONE:           'NONE',
    OPEN:           'OPEN',
    AUTHENTICATING: 'AUTHENTICATING'
};

export const SocialPaneStates = {
    MIN:            'MIN',
    COMPACT:        'COMPACT',
    MAX:            'MAX'
};

export const PlayerModes = {
    MIN:            'MIN',
    NORMAL:         'NORMAL',
    THEATRE:        'THEATRE'
};

export const PlayerAnchors = {
    TOP_LEFT:       'TOP_LEFT',
    TOP_RIGHT:      'TOP_RIGHT',
    BOTTOM_RIGHT:   'BOTTOM_RIGHT',
    BOTTOM_LEFT:    'BOTTOM_LEFT'
};