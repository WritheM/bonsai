import React                    from "react";
import { Provider }             from "react-redux";
import {
    createStore,
    applyMiddleware
}                               from "redux";
import thunk                    from "redux-thunk";

import reducer                  from "./reducers";
import Routes                   from "./Routes"

export default class Application extends React.Component {

    static childContextTypes = {
        store: (a) => !!a,
        socket: (s) => !!s
    };

    constructor() {
        super(...arguments);

        this.store = createStore(
            reducer,
            applyMiddleware(thunk)
        );
    }

    getChildContext() {
        return {
            store: this.store,
            socket: this.props.socket
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
