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

    makeScssBoot    = require('./tasks/make-scss-bootstrap'),

    // Helpers
    cli             = gulpUtil.env;

function barrier(count, callback) {
    var i = 0;

    return function() {
        i++;

        if (i >= count) {
            callback();
        }
    }
};

function onError(error) {
    gulpUtil.log(error.toString());

    this.emit('end');
}

var paths = {
    src: {
        root: 'src/',
        app: 'src/app/',
        api: 'src/api/', // TEMP
        styles: 'src/styles/',
        tests: 'tests/',
        pub: 'public/'
    },
    bin: {
        root: 'bin/',
        pub: 'bin/public/',
        tests: 'bin/tests/',
        app: 'bin/public/app/',
        api: 'bin/public/api/', // TEMP
        deps: 'bin/public/deps/',
        styles: 'bin/public/styles/'
    },
    dist: {
        root: 'dist/',
        compiled: 'dist/compiled/',
        image: 'dist/images/'
    },
    tmp: {
        styles: 'bin/tmp/styles/'
    }
};

var includePaths = {
    commonScss: paths.src.styles,
    appScss: paths.src.app,
    bourbonIo: 'bower_components/bourbon/app/assets/stylesheets'
};

///////////////////////////////////////////////////
// Dependencies (Deps)

gulp.task('deps-clean', function(cb) {
    return del([
        paths.bin.deps + '*.js'
    ]);
});

gulp.task('deps-bower', function() {

    return gulp
        .src(mainBowerFiles(), { base: "./bower_components" })
        .pipe(debug({title: '[Bower Deps]'}))
        .pipe(gulp.dest(paths.bin.deps));

});

gulp.task('deps-node', function() {

    return gulp
        .src([
            'node_modules/babel-core/external-helpers.js'
        ], { base: './node_modules' })
        .pipe(debug({title: '[Node Deps]'}))
        .pipe(gulp.dest(paths.bin.deps));

});

gulp.task('deps-build', ['deps-bower', 'deps-node']);

gulp.task('deps-dist', ['deps-build'], function() {
    return gulp
        .src([
            paths.bin.deps + '**/*.js'
        ])
        .pipe(plumber(onError))
        .pipe(concat('deps.js'))
        .pipe(gulp.dest(paths.dist.compiled))
        .pipe(uglifyJS())
        .pipe(rename('deps.min.js'))
        .pipe(gulp.dest(paths.dist.compiled));
});

///////////////////////////////////////////////////
// Styles (SCSS / CSS)

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

gulp.task('styles-clean', function(cb) {
    return del([
        paths.bin.styles + '*.css'
    ]);
});

gulp.task('styles-common', function() {

    var commonGlob = paths.src.styles + 'common.scss';

    return gulp
        .src(commonGlob)

        .pipe(plumber(onError))

        // SASS Compilation
        .pipe(processScss())

        // Output
        .pipe(gulp.dest(paths.bin.styles))
        .pipe(debug({title: '[Common CSS]'}));

});

gulp.task('styles-components', function() {

    var componentsGlob = paths.src.app + 'components/**/*.Component.scss';
    var bootstrapOptions = {
        output: 'components.scss',
        header: '@import "component";\n\n',
        pathPrefix: 'components'
    };

    return gulp
        .src(componentsGlob)
        .pipe(plumber(onError))

        // Bootstrap
        .pipe(makeScssBoot(bootstrapOptions))
        .pipe(gulp.dest(paths.tmp.styles))

        // SCSS
        .pipe(processScss())

        // Output
        .pipe(gulp.dest(paths.bin.styles))
        .pipe(debug({title: '[Components CSS]'}));
});

gulp.task('styles-build', ['styles-common', 'styles-components']);

gulp.task('styles-dist', ['styles-build'], function() {
    return gulp
        .src(paths.bin.styles + '*.css')
        .pipe(plumber(onError))
        .pipe(concat('site.css'))
        .pipe(gulp.dest(paths.dist.compiled))
        .pipe(uglifyCSS())
        .pipe(rename('site.min.css'))
        .pipe(gulp.dest(paths.dist.compiled));
});

///////////////////////////////////////////////////
// Application (JS)

gulp.task('app-clean', function(cb) {
    return del([
        paths.bin.pub + 'main.js',
        paths.bin.app + '**/*.js',
        paths.bin.api + '**/*.js' // Temp
    ]);
});

/**
 * Compile the Application JS
 */
gulp.task('app-incremental', function() {

    var babelOptions = {

        presets: [
            "es2015",
            "react",

            // ES7 Stage 2+
            "stage-2"
        ],

        plugins: [
            "transform-es2015-modules-amd",
            // Currently there's a new process for building this,
            // We will leave it out for now.
            //"external-helpers",

            // Right now this is stage 1, we'll keep it here until we can clean it up
            "syntax-class-properties",
            "transform-class-properties"
        ]

    };

    var glob = [
        '**/*.js'
    ];

    return gulp
        .src(glob, {
            cwd: paths.src.root
        })

        .pipe(plumber(onError))
        .pipe(newer(paths.bin.pub))

        .pipe(sourcemaps.init())
        .pipe(babel(babelOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.bin.pub))
        .pipe(debug({title: '[Application JS]'}));

});

gulp.task('app-build', ['app-incremental'/*, additional app compile steps here */]);

gulp.task('app-dist', ['public-build', 'app-build'], function() {
    var config = {
        baseUrl: 'bin/public/',
        mainConfigFile: 'bin/public/config.js',
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
        .src('bin/public/main.js')
        .pipe(plumber(onError))
        .pipe(requireJs(config))
        .pipe(debug('[RequireJS]'))
        .pipe(gulp.dest(paths.dist.compiled))
        .pipe(uglifyJS())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(paths.dist.compiled));
});


///////////////////////////////////////////////////
// Images

gulp.task('images-clean', function(cb) {
    // TODO: When images matter
    cb();
});

gulp.task('images-build', function(cb) {
    // TODO: When images matter
    cb();
});

///////////////////////////////////////////////////
// Public Root (Html / Etc...)

gulp.task('public-clean', function(cb) {
    return del([
        paths.bin.pub + '*.html',
        paths.bin.pub + '*.js'
    ]);
});

gulp.task('public-build', function(cb) {

    var wait = barrier(2, cb);

    var context = {
        PRODUCTION: false
    };

    gulp
        .src(paths.src.pub + 'index.html')
        .pipe(preprocess({context: context}))
        .pipe(gulp.dest(paths.bin.pub))
        .on('end', wait);

    gulp
        .src(paths.src.pub + 'config.js')
        .pipe(gulp.dest(paths.bin.pub))
        .on('end', wait);


});

gulp.task('public-dist', function(cb) {

    var wait = barrier(2, cb);

    var context = {
        PRODUCTION: true
    };

    gulp
        .src([
            paths.src.pub + 'index.html'
        ])
        .pipe(preprocess({context: context}))
        .pipe(gulp.dest(paths.dist.root))
        .on('end', wait);

    gulp
        .src([
            paths.src.pub + 'config.js'
        ])
        // TODO: Dist transformes?
        .pipe(uglifyJS())
        .pipe(gulp.dest(paths.dist.root))
        .on('end', wait);

});

///////////////////////////////////////////////////
// Tests

gulp.task('tests-clean', function(cb) {
    return del([
        paths.bin.tests + '**/*.js'
    ]);
});

gulp.task('tests-incremental', function(cb) {

    var babelOptions = {

        presets: [
            "es2015",
            "react",

            // ES7 Stage 2+
            "stage-2"
        ],

        plugins: [
            "transform-es2015-modules-amd",
            "external-helpers",

            // Right now this is stage 1, we'll keep it here until we can clean it up
            "syntax-class-properties",
            "transform-class-properties"
        ]

    };

    var glob = paths.src.tests + '**/*.js';

    return gulp
        .src(glob)

        .pipe(plumber(onError))
        .pipe(newer(paths.bin.tests))

        .pipe(babel(babelOptions))
        .pipe(debug({title: '[Tests]'}))
        .pipe(gulp.dest(paths.bin.tests));

});

gulp.task('tests-build', ['tests-incremental']);

gulp.task('tests-run', function() {

    var mochaOptions = {

    };

    return gulp
        .src('bin/tests/**/*.js')
        .pipe(mocha(mochaOptions));

})

gulp.task('test', function() {

    runSequence(
        'tests-clean',
        'tests-incremental',
        'tests-run'
    );

});



///////////////////////////////////////////////////
// Dist

gulp.task('clean-dist', function() {
    return del([
        paths.dist.root
    ]);
});

gulp.task('dist', function(cb) {

    runSequence(
        'clean-dist',
        'deps-dist',
        'styles-dist',
        'app-dist',
        /* 'images-produce', */
        'public-dist',
        cb
    )

});

///////////////////////////////////////////////////
// Entry Points & Master Tasks

gulp.task('clean-bin', function() {
    return del([
        paths.bin.root
    ]);
});

gulp.task('clean-build', ['deps-clean', 'styles-clean', 'app-clean', /* 'images-clean', */ 'public-clean', 'tests-clean', 'clean-dist']);

gulp.task('build', ['deps-build', 'styles-build', 'app-build', /* 'images-build', */ 'public-build', 'tests-build']);

gulp.task('clean', function(cb) {

    runSequence(
        'clean-build',
        'clean-bin',
        'clean-dist',
        cb
    );

});

gulp.task('default', function(cb) {

    runSequence(
        'clean-build',
        'build',
        cb
    );

});

gulp.task('watch', function() {

    runSequence(
        'clean-build',
        'build',
        watch
    );

});

function watch() {

    var mediumInterval = 500;
    var responsiveInterval = 200;

    /*
     * Removing this for now as it's likely going to be slow
     */
    //gulp.watch(
    //    [
    //        'bower_components/**/*',
    //        'node_modules/**/*'
    //    ],

    //    ['deps-build']
    //);

    gulp.watch(
        'src/**/*.js',
        { interval: mediumInterval },
        ['app-incremental']
    );

    gulp.watch(
        'tests/**/*.js',
        { interval: mediumInterval },
        ['tests-incremental']
    );

    gulp.watch(
        [
            'src/styles/*.scss',
            'src/app/components/**/*.Component.scss'
        ],
        { interval: responsiveInterval },
        ['styles-build']
    );

    gulp.watch(
        'public/*',
        { interval: mediumInterval },
        ['public-build']
    )
}