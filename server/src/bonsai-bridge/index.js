///////////////////////////////////////////////////////
// Bonsai - Server - Bridge Service

// Dependencies

// Library Imports
import {BroadcastClient}    from "bonsai-engine/queue";
import {
    uuid,
    handleDefaultRejections
}                           from "bonsai-engine/utilities";
import {
    getRouteMap,
    route
}                           from "bonsai-engine/routing";
import {
    newStore,
    Tracker
}                           from "bonsai-engine/state";

// Application Imports
import SocketServer         from "./io/SocketServer";
import {
    getControllers
}                           from "./routing";

// Configuration
import * as config from "config";

// Attach the default handler
handleDefaultRejections();

let store = newStore();
let routeMap = [];

let broadcast = new BroadcastClient({
    path: config.rabbit.host,
    exchange: config.rabbit.broadcastqueue,
    router: (path, data) => route(routeMap, path, data)
});

let tracker = new Tracker(broadcast, store);
let bridge = new SocketServer(tracker, config.bridge.port);

routeMap = getRouteMap(getControllers(
    store,
    tracker
));

Promise
    .all([broadcast.listen(), bridge.listen()])
    .then(x => {
        console.log(' [+] Bridge Started, listening on port ' + config.bridge.port);

        store.subscribe(() => {
            console.log("========== Update =========", store.getState());
        });

        for (let routePath in routeMap) {
            broadcast.watch(routePath);
        }
    })
    .catch(err => {
        console.error(' [-] ', err, typeof err);
        console.error(' [X] Unable to start worker.', err);
    });
