////////////////////////////////////////////
// Gulp - Configuration

"use strict";

var paths = {
    src: {
        root: "src/",
        app: "src/app/",
        static: "src/static/",
        images: "src/static/assets/images/",
        styles: "src/styles/"
    },
    output: {
        app:    "bin/public/js/",
        static: "bin/public/",
        styles: "bin/public/styles/"
    },
    tmp: {
        styles: "bin/tmp/styles/"
    }
};

var includePaths = {
    commonScss: paths.src.styles,
    appScss: paths.src.app,
    bourbonIo: 'bower_components/bourbon/app/assets/stylesheets'
};

function getBabelConfiguration() {

    // TODO: Configurable

    return {
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
    };
}

module.exports = {

    paths: paths,
    includePaths: includePaths,

    babel: getBabelConfiguration

};
