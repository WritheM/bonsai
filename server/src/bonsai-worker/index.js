///////////////////////////////////////////////////////
// Bonsai - Server - Worker Service

// Dependencies

// Application Imports
//import engine               from "bonsai-engine";
import {Router}             from "bonsai-engine/routing";
import {BroadcastClient}    from "bonsai-engine/queue";

// Configuration
import * as config from "config";

//import models   from "../app/db/models";

// Controller Imports
// TODO: Automate this?
/*
import Playlists from "./app/controller/Playlists";
import PlaylistMedia from "./app/controller/PlaylistMedia";
import Session from "./app/controller/Session";
*/

//engine.setupDefaultRejectionHandler();

// Initialize Database
// models.sequelize.sync();

// Register Controllers with the Router

let router = new Router();

//router.addController(new Playlists());
//router.addController(new PlaylistMedia());
//router.addController(new Session());

let broadcast = new BroadcastClient({
    path: config.rabbit.host,
    exchange: config.rabbit.broadcastqueue
});

Promise
    .all([broadcast.listen()])
    .then(x => {
        console.log(' [+] Worker Started');

        broadcast.on(false, 'user.*.connect', function(route, data, response) {
            console.log(' [+] Connect Message', route, data);

            response.value = Math.random();
        });

        broadcast.on(false, 'user.*.thing', function(route, data, response) {
            console.log(' [+] Thing Message', route, data);

            response.value = data.num * 100;
        });

    })
    .catch(err => {
        console.error(' [X] Unable to start worker.');
        console.error(err);
        console.error(err.stack);
    });