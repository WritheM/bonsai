module.exports = function (grunt) {
    grunt.initConfig({
        bowerRequirejs: {
            target: {
                rjsConfig: 'public/config.js',
                options: {
                    //    baseUrl: './'
                }
            }
        },
        shell: {
            babel: {
                command: "node node_modules/babel/bin/babel.js --stage 0 --modules amd --out-dir public/bin public/src"
            }
        },
        watch: {
            quick: {
                files: ["public/src/**.js","public/src/*.js"],
                tasks: ["quick"],
                options: {
                    spawn: false,
                    atBegin: true
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('quick', ['shell']);
    grunt.registerTask('default', ['quick']);
};