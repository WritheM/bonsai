export function Route(path, method) {
    return function (target, method, descriptor) {
        if (!target.routes) {
            target.routes = [];
        }

        if (typeof method === "undefined") {
            method = "default";
        }

        target.routes.push({
            path: path,
            method: method,
            func: descriptor.value
        });
    }
}

export default class Controller {
    constructor() {
    }

    addRoutes(router) {
        if (!this.routes) return;

        this.routes.forEach((value) => {
            this.router.addRoute(value.path, value.method, value.func.bind(this));
        });
    }

}
