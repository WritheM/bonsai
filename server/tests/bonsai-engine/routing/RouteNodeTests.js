import { expect }   from "chai"

import RouteNode    from "../../../bin/bonsai-engine/routing/RouteNode"

function testSegments(nodeSegments, targSegments, expected) {
    var node = new RouteNode(null, nodeSegments);
    var result = node.compareSegments(targSegments);

    expect(result).equals(expected);
}

describe('Engine: RouteNode', () => {

    describe('#compareSegments', () => {

        it('should return zero for matching single-depth', () => {
            testSegments(
                ['one'],
                ['one'],
                0
            );
        });

        it('should return negative for divergent single-depth', () => {
            testSegments(
                ['one'],
                ['two'],
                -1
            );
        });

        it('should return positive for matching child', () => {
            testSegments(
                ['one'],
                ['one', 'two'],
                1
            );
        });

        it('should return positive for deeply matching child', () => {
            testSegments(
                ['one'],
                ['one', 'two', 'three', 'four'],
                3
            );
        });

        it('should return negative for partial-matching parent', () => {
            testSegments(
                ['one', 'two'],
                ['one'],
                -1
            );
        });

        it('should return negative for divergent partial-matching parent', () => {
            testSegments(
                ['one', 'two'],
                ['one', 'three'],
                -1
            );
        });

        it('should return zero for node wildcard matches', () => {
            testSegments(
                ['*'],
                ['one'],
                0
            );
        });

        it('should return zero for target wildcard matches', () => {
            testSegments(
                ['one'],
                ['*'],
                0
            );
        });

        it('should return zero for node wildcard deep match', () => {
            testSegments(
                ['one', 'two', '*'],
                ['one', 'two', 'three'],
                0
            );
        });

        it('should return zero for target wildcard deep match', () => {
            testSegments(
                ['one', 'two', 'three'],
                ['one', 'two', '*'],
                0
            );
        });

        it('should return zero for node mid-wildcard deep match', () => {
            testSegments(
                ['one', '*', 'three'],
                ['one', 'two', 'three'],
                0
            );
        });

        it('should return zero for target mid-wildcard deep match', () => {
            testSegments(
                ['one', 'two', 'three'],
                ['one', '*', 'three'],
                0
            );
        });

    });

    describe('#addRoute', () => {

        it('should add single-segment to named entry', () => {

            var root = new RouteNode();
            var routeId = '123';
            var path = 'first';

            root.addRoute(routeId, path);

            expect(root.children['first']).exists;
            expect(root.children['first'].routes).has.length(1);

        });

        it('should add single-segment to wildcard entry', () => {

            var root = new RouteNode();
            var routeId = '123';
            var path = 'first';

            root.addRoute(routeId, path);

            expect(root.children['*']).exists;
            expect(root.children['*'].routes).has.length(1);

        });

        it('should add multi-segment to entries', () => {

            var root = new RouteNode();
            var routeId = '123';
            var path = 'first.second';

            root.addRoute(routeId, path);

            // Child First Should Exist, and it should not have a route
            expect(root.children['first']).exists;
            expect(root.children['first'].routes).empty;

            // Sub-Child Wildcard Should Exist, and should have the route
            expect(root.children['first'].children['*']).exists;
            expect(root.children['first'].children['*'].routes).has.length(1);

            // Sub-Child Named Should Exist, and should have the route
            expect(root.children['first'].children['second']).exists;
            expect(root.children['first'].children['second'].routes).has.length(1);

            // Child Wildcard Should Exist, and it should not have a route
            expect(root.children['*']).exists;
            expect(root.children['*'].routes).empty;

            // Sub-Child Wildcard Should Exist, and should have the route
            expect(root.children['*'].children['*']).exists;
            expect(root.children['*'].children['*'].routes).has.length(1);

            // Sub-Child Named Should Exist, and should have the route
            expect(root.children['*'].children['second']).exists;
            expect(root.children['*'].children['second'].routes).has.length(1);

        });

    });
});