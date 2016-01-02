import {
    mapping
}                       from './elements';

import TrackedElement   from './TrackedElement';

function makeTrackerFactory(tracker, prefix, Element) {
    if (!tracker.tracked) {
        tracker.tracked = {};
    }

    if (!tracker.tracked[prefix]) {
        tracker.tracked[prefix] = {};
    }

    var factory = function(id) {
        if (!tracker.tracked[prefix][id]) {
            let instance = new Element(tracker, id, tracker[prefix].die);

            if ((!instance instanceof TrackedElement)) {
                throw new Error(
                    'Activator for tracker element `' + prefix + '` is not based ' +
                    'off TrackedElement. Behavior is unpredictable.');
            }

            tracker.tracked[prefix][id] = instance;
        }

        return tracker.tracked[prefix][id];
    };

    factory.die = function(id) {
        if (tracker.tracked[prefix[id]]) {
            delete tracker.tracked[prefix[id]];
        }
    };

    tracker[prefix] = factory;
}

export default class Tracker {
    constructor(client) {
        this.client = client;

        for(let prefix in mapping) {
            let element = mapping[prefix];

            makeTrackerFactory(this, prefix, element);
        }
    }
}
