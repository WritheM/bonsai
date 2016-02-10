'use strict';

var gulpUtils   = require('gulp-util'),
    through     = require('through2'),
    assign      = require('object-assign'),
    path        = require('path'),
    _           = require('lodash'),
    File        = gulpUtils.File,
    PluginError = gulpUtils.PluginError;

function makeScssBootstrap(opts) {

    if (typeof opts === "string") {
        opts = {
            output: opts
        };
    }

    var options = _.extend({
        output: null,
        header: null
    }, opts);

    if (!options.output) {
        throw new PluginError('make-scss-bootstrap', 'Missing output path for bootstrap file.');
    }

    var files = [];

    var buffer = function(file, enc, cb) {

        files.push(file.relative);
        cb();

    };

    var complete = function(cb) {

        var contents = options.header
            ? options.header + '\n'
            : '// No Header Specified\n';

        for(var i = 0; i < files.length; i++) {
            var component = files[i];
            var pathInfo = path.parse(component);

            var componentRef = path.join(pathInfo.dir, pathInfo.name);

            if (opts.pathPrefix) {
                componentRef = path.join(opts.pathPrefix, componentRef);
            }

            contents += '@import "' + componentRef + '";\n';
        }

        var buff = new Buffer(contents.length);
        buff.write(contents);

        var result = new File({
            path: options.output,
            contents: buff
        });

        this.push(result);

        cb();

    };

    return through.obj(buffer, complete);

}

module.exports = makeScssBootstrap;