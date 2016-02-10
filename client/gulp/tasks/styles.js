///////////////////////////////////////////////////////
// Gulpfile - Task - Styles

"use strict";

var gulp            = require("gulp"),
    util            = require("gulp-util"),

    concat          = require('gulp-concat'),
    uglifyCSS       = require('gulp-uglifycss'),

    plumber         = require("gulp-plumber"),
    debug           = require("gulp-debug"),

    del             = require('del'),
    streamqueue     = require("streamqueue"),

    config          = require("../config"),
    common          = require("../common"),
    makeBoot        = require("../processes/make-scss-bootstrap"),
    processScss     = require("../processes/process-scss"),

    cli             = util.env;

function buildCommonStyles() {
    var commonGlob = config.paths.src.styles + "common.scss";

    return gulp
        .src(commonGlob)
        .pipe(plumber(common.emitError))
        .pipe(processScss());
}

function buildComponentStyles() {
    var componentsGlob = config.paths.src.app + "components/**/*.Component.scss";

    var bootstrapOptions = {
        output: "components.scss",
        header: "@import \"component\";\n\n",
        pathPrefix: "components"
    };

    return gulp
        .src(componentsGlob)
        .pipe(plumber(common.emitError))

        // Bootstrap
        .pipe(makeBoot(bootstrapOptions))
        .pipe(gulp.dest(config.paths.tmp.styles))

        // SCSS
        .pipe(processScss());
}

gulp.task("styles", ["styles-clean"], function() {

    var allStyles = streamqueue(
        { objectMode: true },
        buildCommonStyles(),
        buildComponentStyles()
    );

    if (cli.production) {
        allStyles = allStyles
            .pipe(uglifyCSS())
            .pipe(concat("main.min.css"));
    }

    return allStyles
        .pipe(gulp.dest(config.paths.output.styles))
        .pipe(debug({title: "[CSS]"}));

});

gulp.task("styles-clean", function() {
    return del([
        config.paths.output.styles + "*.css",
        config.paths.output.styles + "*.map"
    ]);
});

gulp.task("styles-watch", ["styles"], function(cb) {

    gulp.watch(
        [
            config.paths.src.styles + "*.scss",
            config.paths.src.app + "components/**/*.Component.scss"
        ],
        { interval: config.watch.interval },
        ["styles"]
    );

    cb();

});