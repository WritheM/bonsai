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
    mocha           = require('gulp-mocha'),

// Utils
    del             = require('del'),
    runSequence     = require('run-sequence'),

// Helpers
    cli             = gulpUtil.env;

var paths = {
    bin: 'bin/',
    testsBin: 'bin_tests/'
};

var globs = {
    javascript: 'src/**/*.js',
    javascriptBin: 'bin/**/*.js',
    tests: 'tests/**/*.js',
    testsBin: 'bin_tests/**/*.js'
};

/**
 * General Error Handler
 * @param error
 */
function onError(error) {
    gulpUtil.log(error.toString());

    this.emit('end');
}

///////////////////////////////////////////////////////
// Javascript (App)

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
        presets: [
            'es2015',

            // ES7 Stage 2+
            'stage-2'
        ],

        plugins: [
            "syntax-class-properties",
            "transform-class-properties"
        ]
    };

    return gulp
        .src(globs.javascript)

        // Error Handling & Debugging
        .pipe(plumber(onError))
        .pipe(newer(paths.bin))
        .pipe(debug({title: '[App Javascript]'}))

        .pipe(sourcemaps.init())
            .pipe(babel(babelOptions))
        .pipe(sourcemaps.write())

        .pipe(gulp.dest(paths.bin));

});

/////////////////////////////////////////////////////////
// Tests

gulp.task('tests-clean', function() {
    return del([
        globs.testsBin
    ]);
});

gulp.task('tests-incremental', function() {

    var babelOptions = {
        presets: [
            'es2015',

            // ES7 Stage 2+
            'stage-2'
        ],

        plugins: [
            "syntax-class-properties",
            "transform-class-properties"
        ]
    };

    return gulp
        .src(globs.tests)

        // Error Handling & Debugging
        .pipe(plumber(onError))
        .pipe(newer(paths.testsBin))
        .pipe(debug({title: '[Tests]'}))

        .pipe(sourcemaps.init())
        .pipe(babel(babelOptions))
        .pipe(sourcemaps.write())

        .pipe(gulp.dest(paths.testsBin));

});

gulp.task('tests-build', function(cb) {
    runSequence('tests-clean', 'tests-incremental', cb);
});

gulp.task('test', ['tests-build'], function() {

    var mochaOptions = {

    };

    return gulp
        .src(globs.testsBin)
        .pipe(mocha(mochaOptions));

});

/**
 * Clean the whole project
 */
gulp.task('clean', ['js-clean']);

/**
 * Full Build of the project
 */
gulp.task('build', ['js-incremental', 'tests-incremental']);

gulp.task('default', function(cb) {

    runSequence(
        'clean',
        'build',
        cb
    );

});

gulp.task('watch', function(cb) {
    runSequence(
        'clean',
        'build',
        watch
    );
});

function watch() {
    gulp.watch(
        [
            globs.javascript
        ],
        ['js-incremental']
    );
    gulp.watch(
        [
            globs.tests
        ],
        ['tests-incremental']
    )
}