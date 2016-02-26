import React            from "react"
import ReactRouter, {
    Route,
    Router,
    IndexRoute,
    NotFoundRoute,
    Redirect,
    HashLocation,
    RouteHandler }      from "react-router"

import Shell            from "./components/Shell";

import PageDashboard    from "./pages/Dashboard";

import PageUsersIndex   from "./pages/users/Index";
import PageUsersProfile from "./pages/users/Profile";
import PageUsersDetails from "./pages/users/Details";

/******************************************/

export default (
    <Router>
        <Route path="/" component={Shell}>
            <IndexRoute component={PageDashboard} />

            {/* Users */}
            <Route path="users">
                <IndexRoute component={PageUsersIndex} />
                <Route path="profile" component={PageUsersProfile} />
                <Route path=":userEncodedId" component={PageUsersDetails} />
            </Route>
        </Route>
    </Router>
);