var gulp                = require('gulp'),
    gulpUtil            = require('gulp-util'),
// Gulp Modules
    /*
    gulpIf          = require('gulp-if'),
    babel           = require('gulp-babel'),
    concat          = require('gulp-concat'),
    debug           = require('gulp-debug'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),
    newer           = require('gulp-newer'),
    sass            = require('gulp-sass'),
    mocha           = require('gulp-mocha'),
    preprocess      = require('gulp-preprocess'),
    uglifyJS        = require('gulp-uglify'),
    uglifyCSS       = require('gulp-uglifycss'),
    requireJs       = require('gulp-requirejs-optimize'),

    // Utils
    path            = require('path'),
    del             = require('del'),
    lazypipe        = require('lazypipe'),
    mainBowerFiles  = require('main-bower-files'),
    runSequence     = require('run-sequence'),
    */

    DedupePlugin        = require("webpack/lib/optimize/DedupePlugin"),
    CommonsChunkPlugin  = require("webpack/lib/optimize/CommonsChunkPlugin"),
    UglifyPlugin        = require("webpack/lib/optimize/UglifyJsPlugin"),

    named               = require("vinyl-named"),
    webpack             = require("webpack-stream"),

    path                = require("path"),

    // Helpers
    cli                 = gulpUtil.env;

var babelLoader = {

    //  Detection
    test: /\.js?$/,
    exclude: /(node_modules|bower_components)/,

    // Configuration
    loader: "babel",
    query: {
        presets: [
            "es2015",
            "stage-2",
            "react"
        ],

        plugins: [
            // Currently there's a new process for building this,
            // We will leave it out for now.
            //"external-helpers",

            // Right now this is stage 1, we'll keep it here until we can clean it up
            "syntax-class-properties",
            "transform-class-properties"
        ]
    }

};

var jsonLoader = {

    // Detection
    test: /\.json?$/,

    // Configuration
    loader: "json"

};


function buildWebpackConfig(settings) {

    var config = Object.assign({}, {
        watch: false,
        pack: false
    }, settings || {});

    var nodePath    = path.resolve("./node_modules");
    var bowerPath   = path.resolve("./bower_modules");

    // I don't like this, the chunk
    // pattern should handle it :/
    var commonsName = config.pack
        ? "commons.min.js"
        : "commons.js";

    var plugins = [
        new DedupePlugin(),
        new CommonsChunkPlugin("commons", commonsName)
    ];

    if (config.pack) {
        plugins.push(new UglifyPlugin());
    }

    var devtool = config.pack
        ? null
        : "source-map";

    var outputPattern = config.pack
        ? "[name].min.js"
        : "[name].js";


    return {

        watch: config.watch,

        devtool: devtool,

        output: {
            filename: outputPattern
        },

        entry: {
            main: "./src/main.js",
            commons: [
                // Frontend
                "alt",
                "react",
                "react-dom",
                "react-router",

                // Backend
                "backbone",
                "jquery",

                // Other
                "socket.io-client",
                "youtube"
            ]
        },

        module: {
            loaders: [
                babelLoader,
                jsonLoader
            ]
        },

        resolve: {
            root: [
                nodePath,
                bowerPath
            ]
        },

        node: {
            fs: "empty",
            net: "empty",
            tls: "empty",
            file: "empty"
        },

        plugins: plugins

    };
}


gulp.task('app-webpack-build', function() {

    return gulp.src('src/main.js')
        .pipe(named())
        .pipe(webpack(buildWebpackConfig()))
        .pipe(gulp.dest(path.resolve("./bin/public")));

});

gulp.task('app-webpack-publish', function() {

    return gulp.src('src/main.js')
        .pipe(named())
        .pipe(webpack(buildWebpackConfig({ pack: true })))
        .pipe(gulp.dest(path.resolve("./bin/public")));

});

gulp.task('app-webpack-publish', function() {

    return gulp.src('src/main.js')
        .pipe(named())
        .pipe(webpack(buildWebpackConfig({ pack: true })))
        .pipe(gulp.dest(path.resolve("./bin/public")));

});