
import { expect }   from "chai"

import * as routing       from "../../../bin/bonsai-engine/routing"

describe('Engine: Routing', () => {

    describe('#createRoute', () => {

        it('should return a basic route', () => {

            var path = 'path';
            var target = {};
            var func = function() {};

            var actual = routing.createRoute(path, target, func);

            expect(actual).to.exist;
            expect(actual).to.be.an('object');
            expect(actual.path).to.equal(path);
            expect(actual.func).to.exist;
            expect(actual.func).to.be.a('function');
            expect(actual.priority).to.be.equal(0);

        });

        it('should bind func to target', () => {

            var path = 'path';

            var target = {};
            var actualTarget = null;

            var func = function() { actualTarget = this; };

            var actual = routing.createRoute(path, target, func);

            expect(actual).to.exist;
            expect(actual).to.be.an('object');
            expect(actual.func).to.exist;

            actual.func();

            expect(actualTarget).to.exist;
            expect(actualTarget).to.equal(target);

        });

    });

    describe('#createRoutes', () => {

        it('should create basic routes', () => {

            var target = {};

            var oneCalled = false;
            var twoCalled = false;

            var actual = routing.createRoutes(target, {
                'path1': function() { oneCalled = true; },
                'path2': function() { twoCalled = true; }
            });

            expect(actual).to.exist;
            expect(actual).to.have.length(2);

            expect(actual[0]).to.be.an('object');
            expect(actual[0].path).to.equal('path1');


            expect(actual[1]).to.be.an('object');
            expect(actual[1].path).to.equal('path2');

        });

        it('should create priority routes', () => {

            var target = {};

            var oneCalled = false;
            var twoCalled = false;

            var actual = routing.createRoutes(target, {
                'path1': [function() { oneCalled = true; }, 10],
                'path2': [function() { twoCalled = true; }, 20]
            });

            expect(actual).to.exist;
            expect(actual).to.have.length(2);

            expect(actual[0]).to.be.an('object');
            expect(actual[0].path).to.equal('path1');
            expect(actual[0].priority).to.equal(10);


            expect(actual[1]).to.be.an('object');
            expect(actual[1].path).to.equal('path2');
            expect(actual[1].priority).to.equal(20);

        });

        it('should create mixed routes', () => {

            var target = {};

            var oneCalled = false;
            var twoCalled = false;

            var actual = routing.createRoutes(target, {
                'path1': [function() { oneCalled = true; }, 10],
                'path2': function() { twoCalled = true; }
            });

            expect(actual).to.exist;
            expect(actual).to.have.length(2);

            expect(actual[0]).to.be.an('object');
            expect(actual[0].path).to.equal('path1');
            expect(actual[0].priority).to.equal(10);


            expect(actual[1]).to.be.an('object');
            expect(actual[1].path).to.equal('path2');
            expect(actual[1].priority).to.equal(0);

        });

    });

});