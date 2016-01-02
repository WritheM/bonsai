///////////////////////////////////////////////////////
// Bonsai - Engine - Utilities Module

function uuidSegment() {

    var random4HexNumber = Math.floor((1 + Math.random()) * 0x10000);

    // Convert to Hex Notation/String
    return random4HexNumber
        .toString(16)  // HEX
        .substring(1); // Trim

}

/**
 * Generate a UUID
 * -- Adapted from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * -- (Credit where credit is due)
 */
export function uuid() {
    var segments = [
        uuidSegment() + uuidSegment(),
        uuidSegment(),
        uuidSegment(),
        uuidSegment(),
        uuidSegment() + uuidSegment() + uuidSegment()
    ];

    return segments.join('-');
}


/**
 * Determine if an object passed is a promise. Since all promise libraries aren't built
 * the same we will look for the only global standard on promises, even though we'll likely
 * be using ES6/Babel Promises here.
 *
 * @param target The object to test
 */
export function isPromise(target) {
    return target &&
        typeof target === "object" &&
        typeof target.then === "function";
}

/**
 * Setup a basic rejection handler to output errors without crashing out the application
 */
export function handleDefaultRejections() {
    process.on('unhandledRejection', function(error, promise) {
        console.error("UNHANDLED REJECTION", error.stack);
    });
}

export const debug = function() { console.log(...arguments); }; // TODO: When debug() works?