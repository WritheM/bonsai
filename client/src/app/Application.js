import React                    from "react";
import { Provider }             from "react-redux";

import {
    createStore,
    applyMiddleware
}                               from "redux";
import thunk                    from "redux-thunk";

import BonsaiApi                from "../api";
import {
    apiModulesFactory
}                               from "../api/modules";

import {
    SessionActions
}                               from "./actions/index";

import {
    logger,
    crashReporter
}                               from "./middleware";
import {
    appModulesFactory
}                               from "./modules";

import reducer                  from "./reducers";

import Routes                   from "./Routes"

export default class Application extends React.Component {

    static childContextTypes = {
        store:  React.PropTypes.object.isRequired,
        api:    React.PropTypes.object.isRequired
    };

    constructor() {
        super(...arguments);

        this.store = createStore(
            reducer,
            applyMiddleware(
                logger,
                crashReporter,
                thunk
            )
        );

        this.api = new BonsaiApi({
            // TODO: Configuration
        });

        var apiModules = apiModulesFactory();
        for(let module of apiModules) {
            this.api.addModule(module);
        }

        let appModules = appModulesFactory(
            action => this.store.dispatch(action),
            () => this.store.getState()
        );

        for(let module of appModules) {
            this.api.addModule(module);
        }
    }

    getChildContext() {
        return {
            store: this.store,
            api: this.api
        }
    }

    render() {
        return (
            <Provider store={this.store}>
                {Routes}
            </Provider>
        );
    }

}