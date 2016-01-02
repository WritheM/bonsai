let defaultConfiguration = {
    path: null,
    priority: 0
};

/**
 * Defines a route on a method.
 */
export default function Route(configuration, priority) {

    let configSent = typeof configuration === "object";

    if (!configSent) {
        configuration = {
            path: configuration,
            priority: priority || 0
        };
    }

    let config = Object.assign(
        {},
        defaultConfiguration,
        configuration
    );

    return function (target, method, descriptor) {
        if (!target.routes) {
            target.routes = [];
        }

        // Clone the config, add the func to it.
        var route = {
            func: descriptor.value.bind(target),
            ...config
        };

        target.routes.push(route);
    }
}
