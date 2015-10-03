require("babel/polyfill");

import Router from "./Router";
import * as Rabbit from "./Rabbit";
import models from "./db/models";

models.sequelize.sync();

import Playlists from "./controller/Playlists";
import PlaylistMedia from "./controller/PlaylistMedia";
import Session from "./controller/Session";

let router = new Router();

//init controllers here
router.addController(new Playlists());
router.addController(new PlaylistMedia());
router.addController(new Session());

let server = new Rabbit.server(router);
server.listen();