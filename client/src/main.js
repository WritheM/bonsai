// Libraries
import React        from "react"
import ReactDOM     from "react-dom"

// App Logic
import * as socket          from "./api/socket"

import * as Constants       from "./app/Constants"
import * as Utilities       from "./app/Utilities"

//import BonsaiAlt            from "./app/AltInstance"
import BonsaiApplication    from "./app/Application"

// Routing
//import Routes               from "./app/Routes"
//import ReactRouter, {
//    HashLocation }          from "react-router"

//let flux = new BonsaiAlt(fluxConfig, socket, {});
//let UIActions = flux.getActions(Constants.Actions.UI);

//window.Bonsai = flux; // Throw it somewhere publically for now so we can fiddle if needed.

var application = (<BonsaiApplication socket={socket} />);
window.Bonsai = application;

ReactDOM.render(
    application,
    document.getElementById('root')
);

