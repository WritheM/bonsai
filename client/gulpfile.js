///////////////////////////////////////////////////////
// Gulpfile - Bonsai Client

var gulp = require("gulp"),
    util = require("gulp-util")
    ;

require("require-dir")("./gulp/tasks", { recurse: true });

gulp.task("build", [
    "app",
    "styles",
    "static",
    "images"
]);

// TODO: Re-Implement
gulp.task("images", []);

gulp.task("default", ["build"]);