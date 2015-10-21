import React from "react"

import * as Utilities from "./Utilities"

/**
 * Generate a store listener method.
 * @param key The store key to populate in the master state object
 * @param callback {Function} The method to execute with the state object.
 * @returns {Function} The Listener function
 */
function getListener(key, callback) {
    return (storeState) => {

        let state = {};
        state[key] = storeState;

        return callback(state);
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
function attachStoreListeners(stores, storeListeners, callback) {

    Object
        .keys(stores)
        .forEach((key) => {

            let listener        = getListener(key, callback);
            let store           = stores[key];
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

    /**
     * Rebinds a bunch of methods to always fire against this object.
     * @param methodList array An array of method names or prototype methods to rebind.
     */
    selfBindMethods(methodList) {

        if (typeof methodList === "object" && !Array.isArray(methodList)) {
            methodList = Object.keys(methodList).map((item) => methodList[item]);
            console.warn(
                this.constructor.name +
                ' is using selfBindMethods with an object. This is not ' +
                'recommended as the results are unpredictable');
        } else if (typeof methodList === "function") {
            methodList = [methodList];
        }

        methodList.forEach((item) => {

            var itemIsMethod    = typeof item === "function",
                method          = itemIsMethod ? item : this[item],
                methodName      = itemIsMethod ? item.name : item;

            this[methodName] = method.bind(this);
        });

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

        this.selfBindMethods([
            this.onNewState
        ]);
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
            attachStoreListeners(this.stores, this.storeListeners, this.onNewState);

            this.onNewState(getInitialState(this.stores));
        }
    }

    componentWillUnmount() {
        if (this.storeListeners) {
            detachStoreListeners(this.stores, this.storeListeners);

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