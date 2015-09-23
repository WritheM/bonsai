import Router from "Router";
import Rabbit from "Rabbit";

let router = new Router();

//init controllers here

let server = Rabbit.server(router);
server.listen();