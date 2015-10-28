/**
 * Gulp Build file for Bonsai - Server
 */

var gulp            = require('gulp'),
// Gulp Modules
    gulpUtil        = require('gulp-util'),
    gulpIf          = require('gulp-if'),
    babel           = require('gulp-babel'),
    debug           = require('gulp-debug'),
    plumber         = require('gulp-plumber'),
    sourcemaps      = require('gulp-sourcemaps'),
    newer           = require('gulp-newer'),

// Utils
    del             = require('del'),
    runSequence     = require('run-sequence'),

// Helpers
    cli             = gulpUtil.env;

var paths = {
    bin: 'bin'
};

var globs = {
    javascript: 'src/**/*.js',
    javascriptBin: 'bin/**/*.js'
};

/**
 * General Error Handler
 * @param error
 */
function onError(error) {
    gulpUtil.log(error.toString());

    this.emit('end');
}

/**
 * Clean just the JS files
 */
gulp.task('js-clean', function() {
    return del([
        globs.javascriptBin
    ]);
});

/**
 * Build the JS (Babelize it) incrementally
 */
gulp.task('js-incremental', function() {

    var babelOptions = {
        nonStandard: true,
        stage: 0
    };

    return gulp
        .src(globs.javascript)

        // Error Handling & Debugging
        .pipe(plumber(onError))
        .pipe(newer(paths.bin))
        .pipe(debug({title: '[PROCESS:js]'}))

        .pipe(sourcemaps.init())
            .pipe(babel(babelOptions))
        .pipe(sourcemaps.write())

        .pipe(gulp.dest(paths.bin));

});

/**
 * Clean the whole project
 */
gulp.task('clean', ['js-clean']);

/**
 * Full Build of the project
 */
gulp.task('build', function(cb) {

    // We will use the run-sequence plugin to ensure some elements
    // run not parallelized (so they don't delete things while we're making them)
    runSequence(
        'clean',
        'js-incremental',
        cb
    );

});

gulp.task('default', ['build'], function(cb) {
    if (!cli.watch) {
        cb();
        return;
    }

    gulp.watch(
        [
            globs.javascript
        ],
        ['js-incremental']
    );
});