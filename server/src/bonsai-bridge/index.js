///////////////////////////////////////////////////////
// Bonsai - Server - Bridge Service

// Dependencies

// Library Imports
import {BroadcastClient}    from "bonsai-engine/queue";
import {
    uuid,
    handleDefaultRejections
}                           from "bonsai-engine/utilities";
import {Tracker}            from "bonsai-engine/tracking";
import {Connection}         from "bonsai-engine/tracking/elements";

// Application Imports
import SocketServer         from "./io/SocketServer";

// Configuration
import * as config from "config";

// Attach the default handler
handleDefaultRejections();

let broadcast = new BroadcastClient({
    path: config.rabbit.host,
    exchange: config.rabbit.broadcastqueue
});

let tracker = new Tracker(broadcast);
let bridge = new SocketServer(tracker, config.bridge.port);

Promise
    .all([broadcast.listen(), bridge.listen()])
    .then(x => {
        console.log(' [+] Bridge Started, listening on port ' + config.bridge.port);

        setInterval(() => {
            //console.log('========== Clients ==========', bridge.clients);
            //console.log('========== Tracker ==========', tracker.tracked);
        }, 30000)
    })
    .catch(err => {
        console.error(' [-] ', err, typeof err);
        console.error(' [X] Unable to start worker.', err);
    });
