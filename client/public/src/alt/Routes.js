import React            from "react"
import ReactRouter, {
    Route,
    DefaultRoute,
    NotFoundRoute,
    Redirect,
    HashLocation,
    RouteHandler }      from "react-router"

/*************** POLYFILLS *****************/

class RoutingRoot extends React.Component {
    render() {
        return (
            <RouteHandler />
        )
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <div className="c-dashboard">
                  Dashboard
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