var defaultContext = {
    tracker: null,
    models: {}
};

export default class Controller {

    constructor(context, routes = []) {

        this.context = {
            ...defaultContext,
            ...context
        };

        this.routes = routes;
    }
}
