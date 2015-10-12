var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),
    watch           = require('gulp-watch'),
    sass            = require('gulp-sass'),
    babel           = require('gulp-babel'),
    uglifyJS        = require('gulp-uglify'),
    uglifyCSS       = require('gulp-uglifycss'),
    makeScssBoot    = require('./tasks/make-scss-bootstrap'),
    endDeps;

var includePaths = {
    commonScss: 'public/src/styles',
    bourbonIo: 'bower_components/bourbon/app/assets/stylesheets'
};

var paths = {
    bin: {
        styles: 'public/bin/styles/'
    },
    tmp: {
        styles: {
            common: 'public/tmp/styles/common/',
            components: 'public/tmp/styles/components/'
        }
    }
};

/////////////////////////////////////////////
// Styles

/**
 * Build the common styles section
 */
gulp.task('styles-common:pre', function() {

    var sassOptions = {
        'includePaths': [
            includePaths.bourbonIo
        ]
    };

    return gulp
        .src('public/src/styles/common.scss')
        // Build the scss
        .pipe(sourcemaps.init())
            .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        // Output
        .pipe(gulp.dest(paths.tmp.styles.common));

});

/**
 * Package & Build all Component SCSS Files as one using a generated bootstraper
 */
gulp.task('styles-components:pre', function() {

    var sassOptions = {
        'includePaths': [
            includePaths.bourbonIo,
            includePaths.commonScss
        ]
    };

    var bootstrapOptions = {
        output: 'components.scss',
        header: '@import "component";\n\n'
    };

    return gulp
        .src('public/src/alt/components/**/*.Component.scss')
        // Copy to tmp so the bootstrapper can see them
        .pipe(gulp.dest(paths.tmp.styles.components))
        // Make a bootstrapper
        .pipe(makeScssBoot(bootstrapOptions))
        // Save the bootstrapper to the tmp folder
        .pipe(gulp.dest(paths.tmp.styles.components))
        // Run the SCSS with sourcemaps
        .pipe(sourcemaps.init())
            .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        // Output the css
        .pipe(gulp.dest(paths.tmp.styles.components));
});

gulp.task('styles-common:dev', ['styles-common:pre'], function() {

    return gulp
        .src('public/tmp/styles/common/*.css')
        .pipe(gulp.dest('public/bin/styles/'));

});

gulp.task('styles-components:dev', ['styles-components:pre'], function() {

    return gulp
        .src('public/tmp/styles/components/all.css')
        .pipe(rename('components.css'))
        .pipe(gulp.dest('public/bin/styles/'));

});

gulp.task('styles:dev', ['styles-common:dev', 'styles-components:dev']);

gulp.task('styles:prod', ['styles-common:dev', 'styles-components:dev'], function() {
    return gulp
        // Get the sources in inclusion order
        .src([
            'public/tmp/styles/common/common.css',
            'public/bin/styles/components/components.css'
        ])
        // Combine them
        .pipe(concat('site.css'))
        // Output intermediate file for debugging ease
        .pipe(gulp.dest('public/bin/styles/'))
        .pipe(uglifyCSS({}))
        .pipe(rename('site.min.css'))
        .pipe(gulp.dest('public/bin/styles/'));
});

/////////////////////////////////////////////
// Javascript



/////////////////////////////////////////////
// Watch

gulp.task('watch', function() {

});

gulp.task('default', ['styles:dev']);