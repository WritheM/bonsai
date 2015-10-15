/**
 * Action Collections (Namespaces)
 */
export const Actions = {
    SESSION:    'SESSION',
    SYSTEM:     'SYSTEM',
    UI:         'UI'
};

export const Stores = {
    SESSION:    'SESSION',
    SYSTEM:     'SYSTEM',
    UI:         'UI'
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