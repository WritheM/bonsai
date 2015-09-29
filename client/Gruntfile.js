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
        copy: {
            temp_css: {
                files: [
                    {expand: true, src: ['*.css'], dest: 'public/bin/styles', cwd: 'public/src/styles'}
                ]
            }
        },
        watch: {
            quick: {
                files: ["public/src/**.js","public/src/**/*.js", "public/src/styles/*.css"],
                tasks: ["quick"],
                options: {
                    spawn: false,
                    atBegin: false
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('quick', ['shell', 'copy:temp_css']);
    grunt.registerTask('default', ['quick']);
};