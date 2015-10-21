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
    mainBowerFiles  = require('main-bower-files'),

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

gulp.task('deps-bower', function() {

    return gulp
        .src(mainBowerFiles(), { base: "./bower_components" })
        .pipe(debug())
        .pipe(gulp.dest(paths.bin.deps));

});

gulp.task('deps-node', function() {

    return gulp
        .src([
            'node_modules/babel-core/external-helpers.js'
        ], { base: './node_modules' })
        .pipe(gulp.dest(paths.bin.deps));

});

/**
 * Migrate the Dependencies
 */
gulp.task('deps', ['deps-bower', 'deps-node']);

gulp.task('build:deps', ['deps'], function() {

    return gulp
        .src([
            'public/bin/deps/**/*.js',
            '!public/bin/deps/deps.js',
            '!public/bin/deps/deps.min.js'
        ])
        // TODO: Order if it matters
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
            'react-router',
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
        [
            'bower_components/**/*',
            'node_modules/**/*'
        ]
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