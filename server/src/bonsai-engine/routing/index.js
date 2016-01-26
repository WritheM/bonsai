import Controller   from "./Controller";
import Route        from "./Route";
import RouteNode    from "./RouteNode";
import Router       from "./Router";

import { debug, isPromise } from "../utilities";

/**
 * Prepares a route map from a collection of controllers
 * @param controllers {*[]}
 * @returns {*}
 */
function getRouteMap(controllers) {

    debug(' [*] ROUTING Getting Route Map For Controllers: ', controllers);

    var routes = controllers
        .map(c => c.routes);

    var routeMap = routes
        .reduce(assignRoutes, {});

    for(let routePath in routeMap) {
        routeMap[routePath] = routeMap[routePath].sort(sortRoutes);
    }

    return routeMap;
}

/**
 * Route a message to the handler(s) in a given route map.
 * @param routeMap {*[]} Route Map Registry
 * @param path {string} The path to route to
 * @param data The data
 * @returns Promise
 */
function route(routeMap, path, data) {

    if (!routeMap[path]) {
        return Promise.reject();
    }

    return new Promise(function routePromise(res, rej) {
        var promises = routeMap[path]
            .map(r => mapToPromise(r, data));

        Promise
            .all(promises)
            .then(r => {
                let filtered = r.filter(x => !!x);
                if (filtered.length == 1) {
                    res(filtered[0]);
                } else {
                    res(filtered)
                }
            })
            .catch(rej);
    });
}

/**
 * Creates a route entry
 * @param path The path to register to
 * @param target The root Target for `this` calls
 * @param func The function
 * @param priority (Optional) the priority to execute in
 * @returns {{path: *, func: *, priority: number}}
 */
function createRoute(path, target, func, priority = 0) {
    return {
        path,
        func: func.bind(target),
        priority
    };
}

/**
 * Create a collection of routes from a provided route mapping.
 * @param target The target to bind against
 * @param routes The route mapping
 * @returns {Array} A collection of routes
 */
function createRoutes(target, routes) {

    if (!routes) {
        throw new Error('You must provide routes.');
    }

    return Object
        .keys(routes)
        .map(key => {
            let isFunc = typeof routes[key] === "function",
                func = isFunc ? routes[key] : routes[key][0],
                priority = (isFunc ? 0 : routes[key][1]) || 0;

            return createRoute(key, target, func, priority);
        });
}

/**
 * A Sort function to ensure route ordering.
 * @param a Left hand route
 * @param b Right hand route
 * @returns {number} Comparison Offset
 */
function sortRoutes(a, b) {
    return a.priority - b.priority;
}

/**
 * Route Reducer, Assigns routes into the route map by path
 * @param routeMap The route map
 * @param routes The collection of routes to assign
 */
function assignRoutes(routeMap, routes) {
    for (var route of routes) {
        if (!routeMap[route.path]) {
            routeMap[route.path] = [];
        }

        routeMap[route.path].push(route);
    }

    return routeMap;
}

/**
 * Given a route, execute it and return a promise to the work.
 *
 * If the result is not a promise, wrap it in one. If it is a promise, return it.
 *
 * @param route The route to execute
 * @param data The data to pass
 * @returns Promise The promise to the action.
 */
function mapToPromise(route, data) {
    return new Promise((res, rej) => {
        try {
            console.log('Mapped', route);
            let result = route.func(data);
            if (!isPromise(result)) {
                res(result);
            } else {
                result.then(res, rej);
            }
        } catch (e) {
            rej(e);
        }
    });
}

export {
    createRoute,
    createRoutes,
    getRouteMap,
    route,

    Controller,
    Route, // Not sure if i should keep this, for now it stays.
    RouteNode,
    Router
}