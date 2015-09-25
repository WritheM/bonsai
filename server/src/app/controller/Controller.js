export function Route(path) {
    return function (target, method, descriptor) {
        if (!target.routes) {
            target.routes = [];
        }

        target.routes.push({
            path: path,
            func: descriptor.value
        });
    }
}

export class Controller {
    constructor() {
    }

    addRoutes(router) {
        if (!this.routes) return;

        this.routes.forEach((value) => {
            console.log("Added route "+value.path)
            router.addRoute(value.path, value.func.bind(this));
        });
    }

}
