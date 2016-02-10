///////////////////////////////////////////////
// Gulpfile - Process - Process SCSS

"use strict";

var gulp            = require("gulp"),
    util            = require("gulp-util"),
    sourcemaps      = require('gulp-sourcemaps'),
    newer           = require('gulp-newer'),
    sass            = require('gulp-sass'),

    lazypipe        = require('lazypipe'),

    cli             = util.env;

var config = require("../config");

var processScss = lazypipe()
    .pipe(sourcemaps.init)
    .pipe(sass, {
        'includePaths': [
            config.includePaths.bourbonIo,
            config.includePaths.commonScss,
            config.includePaths.appScss
        ]
    })
    .pipe(sourcemaps.write, ".");

var processScssProduction = lazypipe()
    .pipe(sass, {
        'includePaths': [
            config.includePaths.bourbonIo,
            config.includePaths.commonScss,
            config.includePaths.appScss
        ]
    });

module.exports = function() {
    return cli.production
        ? processScssProduction()
        : processScss();
};
