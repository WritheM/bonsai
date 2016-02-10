///////////////////////////////////////////////////////
// Gulpfile - Task - Static: HTML

"use strict";

var gulp        = require("gulp"),
    util        = require("gulp-util"),

    preprocess  = require('gulp-preprocess'),

    debug       = require("gulp-debug"),
    plumber     = require("gulp-plumber"),

    del         = require("del"),

    config      = require("../config"),
    common      = require("../common"),

    cli         = util.env;

gulp.task("static-html", ["static-html-clean"], function(cb) {

    var context = {
        PRODUCTION: !!cli.production
    };

    return gulp
        .src(config.paths.src.static + 'index.html')
        .pipe(plumber(common.emitError))
        .pipe(preprocess({context: context}))
        .pipe(gulp.dest(config.paths.output.static))
        .pipe(debug({title: '[HTML]'}));

});

gulp.task("static-html-clean", function() {
    return del([
        config.paths.output.static + "index.html"
    ]);
});

gulp.task("static-watch", ["static"], function(cb) {

    // HTML
    gulp.watch(
        [
            config.paths.src.static + "*.html"
        ],
        { interval: config.watch.interval },
        ["static-html"]
    );

    cb();

});

gulp.task("static", ["static-html"]);