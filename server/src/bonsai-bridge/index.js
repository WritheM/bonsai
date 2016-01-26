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

// Configuration
import * as config from "config";
import { getControllers } from "./routing";

// Attach the default handler
handleDefaultRejections();

let store = newStore();
let routeMap = getRouteMap(getControllers(store));

console.log(routeMap);

let broadcast = new BroadcastClient({
    path: config.rabbit.host,
    exchange: config.rabbit.broadcastqueue,
    router: (path, data) => route(routeMap, path, data)
});

let tracker = new Tracker(broadcast, store);
let bridge = new SocketServer(tracker, config.bridge.port);

Promise
    .all([broadcast.listen(), bridge.listen()])
    .then(x => {
        console.log(' [+] Bridge Started, listening on port ' + config.bridge.port);

        setInterval(() => {
            //console.log('========== Clients ==========', bridge.clients);
            //console.log('========== Tracker ==========', tracker.tracked);
            console.log("========== State ==========", store.getState());
        }, 30000);

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
