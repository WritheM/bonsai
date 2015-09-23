export default class Router {
    constructor() {
        this.routes = {};
        this.controllers = [];
    }

    clearRoutes() {
        this.routes = {};
    }

    addController(controller) {
        this.controllers.push(controller);
        controller.addRoutes(this);
    }

    addRoute(path, callback) {
        this.routes[path] = callback;
    }


    getRoute(path, method) {
        if (!(path in this.routes)) {
            throw Error("Invalid path");
        }

        return this.routes[path];
    }

}