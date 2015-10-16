import React from "react"

import * as Utilities from "./Utilities"

/**
 * Generate a store listener method.
 * @param key The store key to populate in the master state object
 * @returns {Function} The Listener function
 */
function getListener(key) {
    return (storeState) => {

        let state = {};
        state[key] = storeState;

        return state;
    }
}

/**
 * Collect the initial state from all the stores and gather it into
 * a master state object.
 *
 * @param stores The stores collection
 * @returns {{}} The master state object
 */
function getInitialState(stores) {

    let state = {};

    Object
        .keys(stores)
        .forEach(function(key) {
            let store = stores[key];
            state[key] = store.getState();
        });

    return state;

}

/**
 * Attaches the store listeners to the stores.
 */
function attachStoreListeners(stores, storeListeners) {

    Object
        .keys(stores)
        .forEach((key) => {

            let listener        = getListener(key);
            let store           = this.stores[key];
            storeListeners[key] = listener;

            store.listen(listener);

        }, this);

}

/**
 * Detaches the store listeners from the stores.
 */
function detachStoreListeners(stores, storeListeners) {

    Object
        .keys(stores)
        .forEach((name) => {

            let listener    = storeListeners[name];
            let store       = stores[name];

            if (!listener) {
                throw "Unable to detach store listener, no listener found for store '" + name + "'.";
            }

            store.unlisten(listener);

        }, this);

}

/**
 * A base component for all components to inherit from.
 *
 * This is where common component helpers for all components go.
 */
export class BaseComponent extends React.Component {

    constructor() {
        super(...arguments);
    }

    static contextTypes = { 
        flux: React.PropTypes.any.isRequired
    };

    static childContextTypes = {
        flux: React.PropTypes.any.isRequired
    };

    get socket() {
        return this.context.flux.socket;
    }

    getChildContext() {
        return {
            flux: this.context.flux
        }
    }

}

/**
 * A base component for all route components.
 *
 * This is where logic for route components goes.
 */
export class RouteComponent extends BaseComponent {

    constructor() {
        super(...arguments);
    }

}

/**
 * A dumb component object for UI Rendering
 *
 * A dumb component is a component that doesn't react to state, it doesn't do complex
 * operations or major interactions with any API. This component is almost entirely
 * UI Rendering, it acts on it's `props` and executes callbacks from its `props`.
 *
 * This is where most of the UI should be based on. Treat this like the 'v' in MVC.
 */
export class DumbComponent extends BaseComponent {

    constructor() {
        super(...arguments);
    }

}

/**
 * A smart component object for Interop
 *
 * A smart component is a component that is attached to one or more stores, it responds to UI actions
 * it executes all the logic required to bring everything together and passes that information to
 * a tree of dumb components below itself.constructor
 *
 * This class is where most of the UI logic should live. Treat this like the 'c' in MVC or the 'VM' in MVVM.
 */
export class SmartComponent extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.actions = {};
        this.stores = {};
        this.storeListeners = {};
    }

    addActions(actionMap) {

        Object
            .keys(actionMap)
            .forEach((key) => {
                var actionId = actionMap[key];
                var actionCollection = this.context.flux.getActions(actionId);
                if (!actionCollection)
                    throw "Unable to find actions '" + actionId + "'.";

                this.actions[key] = actionCollection;
            });

    }

    addStores(storeMap) {

        Object
            .keys(storeMap)
            .forEach((key) => {
                var storeId = storeMap[key];
                var storeInstance = this.context.flux.getStore(storeId);
                if (!storeInstance)
                    throw "Unable to find store '" + storeId + "'.";

                this.stores[key] = storeInstance;
            })

    }

    componentDidMount() {
        if (this.storeListeners){
            this.attachStoreListeners();
            this.onNewState(getInitialState(this.stores));
        }
    }

    componentWillUnmount() {
        if (this.storeListeners) {
            this.detachStoreListeners();
            this.storeListeners = {}; // Reset
        }
    }

    /**
     * Fires when there's new state, all state globs are prefixed with their store key.
     *
     * @param state
     */
    onNewState(state) {
        // No-Op
    }
}