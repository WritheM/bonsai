// BABEL, Why U Do Dis
// (Workaround for known issue)
typeof undefined;

import React from "react"

import * as Utilities from "./Utilities"

/**
 * A base component for all components to inherit from.
 *
 * This is where common component helpers for all components go.
 */
export class BaseComponent extends React.Component {

    constructor() {
        super(...arguments);
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

        //console.warn("DumbComponent is Deprecated, please upgrade.");
    }

}