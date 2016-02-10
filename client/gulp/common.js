///////////////////////////////////////////////////////
// Gulpfile - Common

"use strict";

var gulp            = require("gulp"),
    util            = require("gulp-util");

module.exports = {

    /**
     * Emit Stream Errors and Exit Early instead of hard failure.
     * @param error The error
     */
    emitError: function(error) {
        gulpUtil.log(error.toString());

        this.emit('end');
    }

};