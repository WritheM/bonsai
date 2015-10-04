import React from "react"

import * as Utilities from "./Utilities"

/**
 * Builds the local action cache.
 *
 * @param instance The Component to build the cache for.
 * @param context The Component's Context.
 * @param requiredActions The required actions map.
 * @private
 */
function buildActions(instance, context, requiredActions) {
    let actions = {};

    if (!requiredActions || typeof requiredActions !== "object") {
        return;
    }

    Object
        .keys(requiredActions)
        .forEach((name) => {

            var actionKey = requiredActions[name];
            var actionCollection = context.flux.getActions(actionKey);

            actions[name] = actionCollection;

        });

    instance.actions = actions;
}

function getStoreListener(instance, storeKey) {

    return (...callArguments) => {

        // Agument the arguments
        callArguments.unshift(storeKey);

        Utilities.debug("Store Listener Fired -- " + storeKey + " -- " + instance.constructor.name);

        instance.onStoreUpdated.apply(instance, callArguments);
    }

}


/**
 * Builds the local store cache.
 *
 * @param instance The Component to build the cache for.
 * @param context The Component's Context.
 * @param requiredStores The required stores map.
 * @private
 */
function buildStores(instance, context, requiredStores) {
    let stores = {};
    let storeListeners = {};

    if (!requiredStores || typeof requiredStores !== "object") {
        return;
    }

    Object
        .keys(requiredStores)
        .forEach((name) => {

            var storeKey = requiredStores[name];
            var storeInstance = context
                .flux
                .getStore(storeKey);

            stores[name] = storeInstance;
            storeListeners[name] = getStoreListener(instance, storeKey);

        });

    instance.stores = stores;
    instance.storeListeners = storeListeners;
}

/**
 * A base component with some boilerplate wire-up.
 *
 * This component is predominantly used to take advantage of the react
 * context which we're using to 'inject' our component dependencies
 * to the various components.
 */
export default class Component extends React.Component {

    constructor(props, context) {
        super(props, context);

        buildActions(this, context, this.getRequiredActions());
        buildStores(this, context, this.getRequiredStores());
    }

    static contextTypes = {
        flux: React.PropTypes.any.isRequired
    };

    static childContextTypes = {
        flux: React.PropTypes.any.isRequired
    };

    get socket() {
        return this.flux.socket;
    }

    getChildContext() {
        return {
            flux: this.context.flux
        }
    }

    componentDidMount() {
        if (this.storeListeners){
            this.attachStoreListeners();
        }
    }

    componentWillUnmount() {
        if (this.storeListeners) {
            this.detachStoreListeners();
        }
    }

    /**
     * Get the required actions mapping. Keys represent the local key
     * to store the action under the this.actions object and the value
     * represents the actions collection name.
     *
     * Example:
     *
     * return {
     *    'system': Constants.Actions.SYSTEM
     * }
     */
    getRequiredActions() {
        return null;
    }

    /**
     * Get the required stores mapping. Keys represent the local key
     * to store the action under the this.stores object and the value
     * represents the store to retrieve.
     *
     * Example:
     *
     * return {
     *    'system': Constants.Stores.SYSTEM
     * }
     */
    getRequiredStores() {
        return null;
    }

    /**
     * Fetches the states from all the stores and returns
     * an associative array.
     */
    fetchInitialState() {
        let initialState = {};

        Object
            .keys(this.stores)
            .forEach((name) => {

                var store = this.stores[name];
                if (!store)
                    return;

                initialState[name] = store.getState();

            }, this);

        return initialState;
    }

    /**
     * The method that's fired when a store's state updates.
     *
     * @param storeKey The store key of the store who is updating.
     * @param state The state object from that store.
     */
    onStoreUpdated(storeKey, state) {
        // No-Op
    }

    /**
     * Attaches the store listeners to the stores.
     */
    attachStoreListeners() {

        Object
            .keys(this.storeListeners)
            .forEach((name) => {

                let listener    = this.storeListeners[name];
                let store       = this.stores[name];
                if (!store) {
                    throw "Unable to attach store listener to store '" + name + "'. Store not found.";
                }

                store.listen(listener);

            }, this);

    }

    /**
     * Detaches the store listeners from the stores.
     */
    detachStoreListeners() {

        Object
            .keys(this.storeListeners)
            .forEach((name) => {

                let listener    = this.storeListeners[name];
                let store       = this.stores[name];
                if (!store) {
                    throw "Unable to detach store listener to store '" + name + "'. Store not found.";
                }

                store.unlisten(listener);

            }, this);

    }
}