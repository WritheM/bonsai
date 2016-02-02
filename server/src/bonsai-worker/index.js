///////////////////////////////////////////////////////
// Bonsai - Server - Worker Service

// Dependencies

// Application Imports
import models               from "bonsai-engine/db/models";
import {
    getRouteMap,
    route
}                           from "bonsai-engine/routing";
import {BroadcastClient}    from "bonsai-engine/queue";
import {
    newStore,
    Tracker
}                           from "bonsai-engine/state";
import {
    uuid,
    handleDefaultRejections
}                           from "bonsai-engine/utilities";

// Configuration
import * as config          from "config";

import {
    getDefaultControllers,
}                           from "./routing";
import { debug }            from "./utilities";

handleDefaultRejections();

// Initialize Database
models.sequelize.sync();

// Routing
var routeMap = [];

var broadcast = new BroadcastClient({
    path: config.rabbit.host,
    exchange: config.rabbit.broadcastqueue,
    router: (path, data) => route(routeMap, path, data)
});

var store = newStore();
var tracker = new Tracker(broadcast, store);

routeMap = getRouteMap(getDefaultControllers(
    tracker,
    models
));

process.on('exit', c => {
    console.log(' [-] Worker Terminated PID ' + process.pid);
});

Promise
    .all([broadcast.listen()])
    .then(x => {
        console.log(' [+] Worker Started PID ' + process.pid);

        // Register Routes
        for (let routePath in routeMap) {
            broadcast.watch(routePath);
        }
    })
    .catch(err => {
        console.error(' [X] Unable to start worker.');
        console.error(err);
        console.error(err.stack);
    });
