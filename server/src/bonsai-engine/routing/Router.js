let PATH_SEPARATOR = '.';

import _                from 'lodash';

import { uuid }         from '../utilities';
import RouteNode        from './RouteNode';

export default class Router {
    constructor() {
        // Fast Lookup Tree
        this.root = new RouteNode();
        // Local Route Cache
        this.routes = {};
    }

    clearRoutes() {
        this.root = new RouteNode();
        this.routes = {};
    }

    addRoute(route) {
        let path = route.path;
        let id = uuid();

        this.routes[id] = route;

        this.root.addRoute(id, path);
    }

    addRoutes(routes) {
        for (let route of routes) {
            this.addRoute(route);
        }
    }

    getRoute(path) {
        throw new Error('Unsupported');
    }

    getRoutes(path) {
        let unprocessedRoutes = this
            .root
            .getRoutes(path);

        return _
            .uniq(unprocessedRoutes)
            .map(x => this.routes[x])
            .filter(x => !!x)
            .sort((x, y) => y.priority - x.priority);
    }
}
