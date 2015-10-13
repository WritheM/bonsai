var gulp            = require('gulp'),
    // Gulp Modules
    gulpUtil        = require('gulp-util'),
    gulpIf          = require('gulp-if'),
    babel           = require('gulp-babel'),
    concat          = require('gulp-concat'),
    debug           = require('gulp-debug'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),
    newer           = require('gulp-newer'),
    sass            = require('gulp-sass'),
    uglifyJS        = require('gulp-uglify'),
    uglifyCSS       = require('gulp-uglifycss'),
    requireJs       = require('gulp-requirejs-optimize'),

    // Utils
    path            = require('path'),
    lazypipe        = require('lazypipe'),

    makeScssBoot    = require('./tasks/make-scss-bootstrap'),

    // Helpers
    cli             = gulpUtil.env;

function onError(error) {
    gulpUtil.log(error.toString());

    this.emit('end');
}

var includePaths = {
    commonScss: 'public/src/styles',
    appScss: 'public/src/alt',
    bourbonIo: 'bower_components/bourbon/app/assets/stylesheets'
};

var paths = {
    bin: {
        root: 'public/bin/',
        deps: 'public/bin/deps',
        styles: 'public/bin/styles/',
        out: 'public/bin/out/'
    },
    tmp: {
        styles: 'public/tmp/styles'
    }
};

/////////////////////////////////////////////
// Styles

var processScss = lazypipe()
    .pipe(sourcemaps.init)
    .pipe(sass, {
        'includePaths': [
            includePaths.bourbonIo,
            includePaths.commonScss,
            includePaths.appScss
        ]
    })
    .pipe(sourcemaps.write);

gulp.task('styles-common', function() {

    var commonGlob = 'public/src/styles/common.scss';

    return gulp
        .src(commonGlob)

        .pipe(plumber(onError))
        .pipe(gulpIf(cli.debug, debug({title: '[PROCESS:styles-common]'})))

        // SASS Compilation
        .pipe(processScss())

        // Output
        .pipe(gulp.dest(paths.bin.styles))
        .pipe(gulpIf(cli.debug, debug({title: '[OUTPUT:styles-common]'})));

});

gulp.task('styles-components', function() {

    var componentsGlob = 'public/src/alt/components/**/*.Component.scss';
    var bootstrapOptions = {
        output: 'components.scss',
        header: '@import "component";\n\n',
        pathPrefix: 'components'
    };

    return gulp
        .src(componentsGlob)
        .pipe(plumber(onError))
        .pipe(gulpIf(cli.debug, debug({title: '[PROCESS:styles-components]'})))

        // Bootstrap
        .pipe(makeScssBoot(bootstrapOptions))
        .pipe(gulp.dest(paths.tmp.styles))

        // SCSS
        .pipe(processScss())

        // Output
        .pipe(gulp.dest(paths.bin.styles))
        .pipe(gulpIf(cli.debug, debug({title: '[OUTPUT:styles-components]'})));
});

gulp.task('styles', ['styles-common', 'styles-components'], function(cb) {

    if (cli.production) {

        grunt
            .src([
                'public/bin/styles/common.css',
                'public/bin/styles/components.css'
            ])

            // Combined
            .pipe(concat('site.css'))
            .pipe(gulp.dest(paths.bin.styles))

            // Minified
            .pipe(uglifyCSS())
            .pipe(rename('site.min.css'))
            .pipe(gulp.dest(paths.bin.styles))
            .on('end', function() { cb() });

    } else {
        cb();
    }

});

gulp.task('build:styles', ['styles'], function() {

    return gulp
        .src('public/bin/styles/*.css')
        .pipe(plumber(onError))
        .pipe(concat('site.css'))
        .pipe(gulp.dest(paths.bin.styles))
        .pipe(uglifyCSS())
        .pipe(rename('site.min.css'))
        .pipe(gulp.dest(paths.bin.styles));

});

/////////////////////////////////////////////
// Javascript

/**
 * Dependencies to care about, in the order they're required
 */
var depPaths = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/react/react-with-addons.js',
    'bower_components/alt/dist/alt-with-addons.js',
    'bower_components/socket.io-client/socket.io.js',
    'bower_components/requirejs/require.js',

    'node_modules/babel-core/external-helpers.js'
];

/**
 * Migrate the Dependencies
 */
gulp.task('deps', function() {

    return gulp
        .src(depPaths)

        .pipe(plumber(onError))
        .pipe(gulpIf(cli.debug, debug({title: '[PROCESS:Dependency]'})))

        // Flatten the file paths
        .pipe(rename(function(info) {
            info.dirname = "";
        }))

        .pipe(newer(paths.bin.deps)) // Only update the newer files
        .pipe(gulp.dest(paths.bin.deps))
        .pipe(gulpIf(cli.debug, debug({title: '[PROCESS:Output]'})))

});

gulp.task('build:deps', ['deps'], function() {

    var files = depPaths
        .map(function(dep) {
            return path.join('public/bin/deps/', path.parse(dep).base);
        });

    return gulp
        .src(files)
        .pipe(plumber(onError))
        .pipe(concat('deps.js'))
        .pipe(gulp.dest(paths.bin.deps))
        .pipe(uglifyJS())
        .pipe(rename('deps.min.js'))
        .pipe(gulp.dest(paths.bin.deps));

});

/**
 * Compile the Application JS
 */
gulp.task('app', function() {

    var babelOptions = {
        nonStandard: true,
        stage: 0,
        modules: "amd",
        externalHelpers: true
    };

    var glob = 'public/src/**/*.js';

    return gulp
        .src(glob)

        .pipe(plumber(onError))
        .pipe(gulpIf(cli.debug, debug({title: '[PROCESS:App]'})))

        .pipe(newer(paths.bin.root))
        .pipe(sourcemaps.init())
            .pipe(babel(babelOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.bin.root))
        .pipe(gulpIf(cli.debug, debug({title: '[OUTPUT:App]'})));

});

gulp.task('build:app', ['app'], function() {

    var config = {
        baseUrl: 'public/bin/',
        mainConfigFile: 'public/config.js',
        optimize: 'none',
        exclude: [
            'backbone',
            'jquery',
            'react',
            'altlib',
            'socket.io-client',
            'underscore'
        ]
    };

    return gulp
        .src('public/bin/main.js')
        .pipe(plumber(onError))
        .pipe(requireJs(config))
        .pipe(debug('require-js-output'))
        .pipe(gulp.dest(paths.bin.out))
        .pipe(uglifyJS())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(paths.bin.out));

});

gulp.task('build', ['deps', 'app', 'styles']);

gulp.task('default', ['build'], function(cb) {
    if (!cli.watch) {
        cb();
        return;
    }

    gulp.watch(
        depPaths,
        ['deps']
    );

    gulp.watch(
        'public/src/**/*.js',
        ['app']
    );

    gulp.watch(
        'public/src/styles/*.scss',
        ['styles-common']
    );

    gulp.watch(
        'public/src/alt/components/**/*.Component.scss',
        ['styles-components']
    );

});

gulp.task('produce', ['build:deps', 'build:app', 'build:styles']);