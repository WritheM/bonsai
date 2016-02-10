///////////////////////////////////////////////////////
// Gulpfile - Bonsai Client

var gulp            = require("gulp"),
    util            = require("gulp-util"),

    runSequence     = require("run-sequence")
    ;

require("require-dir")("./gulp/tasks", { recurse: true });

gulp.task("build", [
    "app",
    "styles",
    "static",
    "images"
]);

gulp.task("watch", ["app-watch", "styles-watch", "static-watch"], function() {
    // Empty Task Will keep gulp open
});

gulp.task("default", ["build"]);