require('babel-core/polyfill');

import Router from "./Router";
import * as Rabbit from "../Rabbit";
import models from "./db/models";

process.on('unhandledRejection', function(error, promise) {
    console.error("UNHANDLED REJECTION", error.stack);
});

models.sequelize.sync();

import Playlists from "./controller/Playlists";
import PlaylistMedia from "./controller/PlaylistMedia";
import Session from "./controller/Session";

let router = new Router();

//init controllers here
router.addController(new Playlists());
router.addController(new PlaylistMedia());
router.addController(new Session());

let server = new Rabbit.Server(router);
server.listen().then(() => {
    console.log("listening");
}).catch(e => {
    console.error(e.stack);
});