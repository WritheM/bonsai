export default class Router {
    constructor() {
        this.routes = {};
        this.controllers = {};
    }

    clearRoutes() {
        this.routes = {};
    }

    addController(controller) {
        this.controllers = controller;
        controller.addRoutes(this);
    }

    addRoute(path, method, callback) {
        if (!(path in this.routes)) {
            this.routes[path] = {};
        }

        let route = this.routes[path];

        route[method] = callback;
    }


    getRoute(path, method) {
        if (!(path in this.routes)) {
            throw Error("Invalid path");
        }

        var route = this.routes[path];

        if (method in route) {
            return route[method];
        }
        else if ("default" in route) {
            return route["default"];
        }
        else {
            throw Error("Invalid method");
        }
    }

}