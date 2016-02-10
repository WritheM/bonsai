var gulp                = require('gulp'),
    util                = require('gulp-util'),

    plumber             = require("gulp-plumber"),
    debug               = require("gulp-debug"),

    DedupePlugin        = require("webpack/lib/optimize/DedupePlugin"),
    CommonsChunkPlugin  = require("webpack/lib/optimize/CommonsChunkPlugin"),
    UglifyPlugin        = require("webpack/lib/optimize/UglifyJsPlugin"),

    named               = require("vinyl-named"),
    webpack             = require("webpack-stream"),

    path                = require("path"),
    del                 = require("del"),

    config              = require("../config"),
    common              = require("../common"),

    // Helpers
    cli                 = util.env;

var babelLoader = {

    //  Detection
    test: /\.js?$/,
    exclude: /(node_modules|bower_components)/,

    // Configuration
    loader: "babel",
    query: config.babel()

};

var jsonLoader = {

    // Detection
    test: /\.json?$/,

    // Configuration
    loader: "json"

};

function buildWebpackConfig(settings) {

    var webpackConfig = Object.assign({}, {
        watch: false,
        pack: false
    }, settings || {});

    var nodePath    = path.resolve("./node_modules");
    var bowerPath   = path.resolve("./bower_modules");

    // I don't like this, the chunk
    // pattern should handle it :/
    var commonsName = webpackConfig.pack
        ? "commons.min.js"
        : "commons.js";

    var plugins = [
        new DedupePlugin(),
        new CommonsChunkPlugin("commons", commonsName)
    ];

    if (webpackConfig.pack) {
        plugins.push(new UglifyPlugin());
    }

    var devtool = webpackConfig.pack
        ? null
        : "source-map";

    var outputPattern = webpackConfig.pack
        ? "[name].min.js"
        : "[name].js";


    return {

        watch: webpackConfig.watch,
        watchOptions: {
            poll: true,
            aggregateTimeout: 500 // TODO: Config
        },

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

gulp.task("app", ["app-clean"], function() {

    return gulp.src(config.paths.src.root + "main.js")
        .pipe(plumber())
        .pipe(named())
        .pipe(webpack(buildWebpackConfig({ pack: !!cli.production })))
        .pipe(gulp.dest(config.paths.output.app));

});

gulp.task("app-clean", function() {
    return del([
        config.paths.output.app + "*.js",
        config.paths.output.app + "*.map"
    ]);
});

gulp.task("app-watch", ["app-clean"], function() {

    return gulp.src(config.paths.src.root + "main.js")
        .pipe(plumber())
        .pipe(named())
        .pipe(webpack(buildWebpackConfig({ pack: !!cli.production, watch: true })))
        .pipe(gulp.dest(config.paths.output.app));

});