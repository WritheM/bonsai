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

let flux = new BonsaiAlt(fluxConfig, socket, {});
let UIActions = flux.getActions(Constants.Actions.UI);

window.Bonsai = flux; // Throw it somewhere publically for now so we can fiddle if needed.

ReactRouter.run(Routes, HashLocation, function(Handler) {
    UIActions.updatePageComponent(Handler);
});

React.render(
    <BonsaiApplication flux={flux} />,
    document.getElementById('root')
);

