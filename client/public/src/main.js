// Libraries
import React from "react"

// App Logic
import * as socket          from "./api/socket"

import * as Constants       from "./alt/Constants"
import * as Utilities       from "./alt/Utilities"

import BonsaiAlt            from "./alt/AltInstance"
import BonsaiApplication    from "./alt/Application"

// Routing
import Routes               from "./alt/Routes"
import ReactRouter, {
    HashLocation }          from "react-router"

let fluxConfig = {
    // Nothing here
};

// Let's configure the router prototype
/*let Router = ReactRouter.create({
    routes: Routes,
    location: HashLocation
});*/

let flux = new BonsaiAlt(fluxConfig, socket, {});
let UIActions = flux.getActions(Constants.Actions.UI);

/*Router.run((router, state) => {
    UIActions
    Utilities.debug('Got Navigation', state);
});*/

ReactRouter.run(Routes, HashLocation, function(Handler) {
    UIActions.updatePageComponent(Handler);
});

React.render(
    <BonsaiApplication flux={flux} />,
    document.getElementById('root')
);

