import Router from "./Router";
import * as Rabbit from "./Rabbit";

import PlaylistController from "./controller/PlaylistController";

let router = new Router();

//init controllers here
router.addController(new PlaylistController());

let server = new Rabbit.server(router);
server.listen();