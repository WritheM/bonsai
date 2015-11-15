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
}