///////////////////////////////////////////////////////
// Bonsai - Server - Bridge Service

// Dependencies

// Application Imports
//import engine               from "bonsai-engine";
//import {Router}             from "bonsai-engine/routing";
import {BroadcastClient}    from "bonsai-engine/queue";
import {uuid}               from "bonsai-engine/utilities";

// Configuration
import * as config from "config";

//engine.setupDefaultRejectionHandler();

let broadcast = new BroadcastClient({
    path: config.rabbit.host,
    exchange: config.rabbit.broadcastqueue
});

Promise
    .all([broadcast.listen()])
    .then(x => {
        console.log(' [+] Worker Started');

        setInterval(() => {
            broadcast.broadcast('user.15.connect', {
                num: Math.random(),
                str: uuid()
            });
        }, 10000);

        setInterval(() => {
            broadcast.rpc('user.15.thing', {
                num: Math.random(),
                str: uuid()
            })
            .then(result => {
               console.log('RPC Result: ' + result.value);
            });
        }, 5000);

    })
    .catch(err => {
        console.error(' [-] ', err, typeof err);
        console.error(' [X] Unable to start worker.', err);
    });