import React            from "react"
import ReactRouter, {
    Route,
    DefaultRoute,
    NotFoundRoute,
    Redirect,
    HashLocation,
    RouteHandler }      from "react-router"

// Temp
import * as Constants       from "./Constants"
import { SmartComponent }   from "./Components"

/*************** POLYFILLS *****************/

class RoutingRoot extends React.Component {
    render() {
        return (
            <RouteHandler />
        )
    }
}

class Dashboard extends SmartComponent {

    constructor() {
        super(...arguments);

        this.addActions({
            'queue': Constants.Actions.QUEUE,
            'session': Constants.Actions.SESSION
        });

        this.selfBindMethods([
            this.clicked,
            this.login,
            this.register
        ]);
    }

    clicked() {
        this.actions.queue.playSong({
            'id': '1337',
            'title': 'Public Domain Music: Aquasky (Electronica)',
            'artist': 'TheEyeThatSees',
            'mediaType': 'youtube',
            'mediaCode': '6JMuxTR1d20'
        });
    }

    login() {
        this.actions.session.loginBegin();
    }

    register() {
        this.actions.session.registerBegin();
    }

    render() {
        return (
            <div className="c-dashboard">
                Dashboard -
                <a href="#" onClick={this.clicked}>Load Public Domain Song</a> -
                <a href="#" onClick={this.register}>Register</a> -
                <a href="#" onClick={this.login}>Login</a>
            </div>
        );
    }
}

class Page extends React.Component {
    render() {
        return (
            <div className="e-page">
                Page!
            </div>
        )
    }
}

/******************************************/

export default (
    <Route path="/" handler={RoutingRoot}>
        <DefaultRoute handler={Dashboard} />
        <Route path="page" handler={Page} />
    </Route>
);