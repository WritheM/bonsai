export const PATH_SEPARATOR = '.';
export const WILDCARD = '*';

// TODO: find a new home for this or use somemthing line lodash...
function fastArrayCopy(source) {
    var target = new Array(source.length);
    var index = source.length;
    while(index--) { target[index] = source[index]; }

    return target;
}

export default class RouteNode {

    static getSegments(path) {
        return path.split(PATH_SEPARATOR);
    }

    constructor(parent, segments) {
        this.parent = parent || null;
        this.segments = segments || [];
        this.path = this.segments.join(PATH_SEPARATOR);

        this.routes = [];
        this.children = {};
    }

    addRoute(route, segments) {

        if (typeof segments === "string") {
            segments = RouteNode.getSegments(segments);
        }

        let match = this.compareSegments(segments);

        if (match === 0) {
            this.routes.push(route);
        } else if (match > 0) {
            var nextSegment = segments[this.segments.length];

            var wildcard = this.getChild('*');
            wildcard.addRoute(route, segments);

            var child = this.getChild(nextSegment);
            child.addRoute(route, segments);
        }
    }

    getRoutes(segments) {

        if (typeof segments === "string") {
            segments = RouteNode.getSegments(segments);
        }

        let match = this.compareSegments(segments);
        if (match < 0) {
            return null;
        }

        let routes = fastArrayCopy(this.routes);

        if (match > 0) {
            for(let key in this.children) {
                let route = this.children[key];
                let childRoutes = route.getRoutes(segments);
                if (childRoutes && childRoutes.length) {
                    routes = routes.concat(childRoutes);
                }
            }
        }

        return routes;
    }

    getChild(segment) {
        if (!this.children[segment]) {
            let childSegments = fastArrayCopy(this.segments);
            childSegments.push(segment);

            let child = new RouteNode(this, childSegments);
            this.children[segment] = child;
        }

        return this.children[segment];
    }

    /**
     * Compares segment lists, equating exact matches and wildcard matches.
     *
     * Zero Result:
     *    indicates a perfect match.
     * Negative Result:
     *    indicates the provided segments only matches something in the ancestry of this node.
     * Positive Result:
     *    indicates the provided segments match a child of this node.
     *
     * @param segments an array of path segments
     * @returns {number} a number representing the match level
     */
    compareSegments(segments) {
        let matchedSegments = 0;

        segments = segments || [];

        for (let i = 0; i < this.segments.length; i++) {
            let nodeSegment = this.segments[i];
            let targSegment = segments[i];

            let isMatch =
                targSegment &&
                (
                    targSegment === WILDCARD ||
                    nodeSegment === WILDCARD ||
                    targSegment === nodeSegment
                );

            if (isMatch) {
                matchedSegments++;
            } else {
                break;
            }
        }

        if (matchedSegments === this.segments.length) {
            return segments.length - matchedSegments;
        } else {
            return matchedSegments - this.segments.length;
        }
    }
}