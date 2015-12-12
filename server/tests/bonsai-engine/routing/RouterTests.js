import { expect }   from "chai"

import Router       from "../../../bin/bonsai-engine/routing/Router"

describe('Engine: Router', () => {

    describe('#getRoutes', () => {

        it('should return a basic route', () => {

            var router = new Router();
            var path = 'first';
            var searchPath = 'first';

            var func = function() { /* Nothing */ };

            router.addRoute({
                path: path,
                func: func
            });

            var routes = router.getRoutes(searchPath);

            expect(routes).to.exist;
            expect(routes).to.not.be.empty;

            var route = routes[0];

            expect(route).to.exist;
            expect(route.path).to.equal(path);
            expect(route.func).to.equal(func);

        });

        it('should return a nested route', () => {

            var router = new Router();
            var path = 'first.second';
            var searchPath = 'first.second';

            var func = function() { /* Nothing */ };

            router.addRoute({
                path: path,
                func: func
            });

            var routes = router.getRoutes(searchPath);

            expect(routes).to.exist;
            expect(routes).to.not.be.empty;

            var route = routes[0];

            expect(route).to.exist;
            expect(route.path).to.equal(path);
            expect(route.func).to.equal(func);

        });

        it('should return a wildcard route', () => {

            var router = new Router();
            var path = 'first.*';
            var searchPath = 'first.second';

            var func = function() { /* Nothing */ };

            router.addRoute({
                path: path,
                func: func
            });

            var routes = router.getRoutes(searchPath);

            expect(routes).to.exist;
            expect(routes).to.not.be.empty;

            var route = routes[0];

            expect(route).to.exist;
            expect(route.path).to.equal(path);
            expect(route.func).to.equal(func);

        });

        it('should return multiple routes', () => {

            var router = new Router();
            var path1 = 'first.*';
            var path2 = 'first.second';
            var searchPath = 'first.second';

            var func = function() { /* Nothing */ };

            router.addRoute({
                path: path1,
                func: func
            });

            router.addRoute({
                path: path2,
                func: func
            });

            var routes = router.getRoutes(searchPath);

            expect(routes).to.exist;
            expect(routes).to.not.be.empty;
            expect(routes).to.have.length(2);

            var route1 = routes[0];

            expect(route1).to.exist;
            expect(route1.path).to.equal(path1);
            expect(route1.func).to.equal(func);

            var route2 = routes[1];

            expect(route2).to.exist;
            expect(route2.path).to.equal(path2);
            expect(route2.func).to.equal(func);

        });

        it('should return ordered results', () => {

            var router = new Router();
            var path1 = 'first.*';
            var path2 = 'first.second';
            var searchPath = 'first.second';

            var func = function() { /* Nothing */ };

            router.addRoute({
                path: path1,
                func: func,
                priority: 0
            });

            router.addRoute({
                path: path2,
                func: func,
                priority: 10
            });

            var routes = router.getRoutes(searchPath);

            expect(routes).to.exist;
            expect(routes).to.not.be.empty;
            expect(routes).to.have.length(2);

            var route1 = routes[0];

            expect(route1).to.exist;
            expect(route1.path).to.equal(path2);
            expect(route1.func).to.equal(func);

            var route2 = routes[1];

            expect(route2).to.exist;
            expect(route2.path).to.equal(path1);
            expect(route2.func).to.equal(func);

        });

    });

});
