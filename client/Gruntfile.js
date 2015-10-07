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
        sass: {
            options: {
                sourceMap: true
            },
            common: {
                files: {
                    'public/bin/styles/common.css': 'public/src/styles/common.scss'
                }
            },
            components: {
                options: {
                    includePaths: [
                        'public/src/styles',
                        'bower_components/bourbon/app/assets/stylesheets'
                    ]
                },
                files: {
                    'public/bin/styles/components.css': 'public/bin/styles/components.scss'
                }
            }
        },
        copy: {
            temp_css: {
                files: [
                    {expand: true, src: ['*.css'], dest: 'public/bin/styles', cwd: 'public/src/styles'}
                ]
            }
        },
        concat: {
            combine_components: {
                src: ['public/src/styles/_componentsHeader.scss', 'public/src/alt/**/*.Component.scss'],
                dest: 'public/bin/styles/components.scss',
            }
        },
        watch: {
            'quick-js': {
                files: ["public/src/**/*.js"],
                tasks: ["quick-js"],
                options: {
                    spawn: false,
                    atBegin: false
                }
            },
            'quick-css': {
                files: ["public/src/**/*.scss"],
                tasks: ["quick-css"],
                options: {
                    spawn: false,
                    atBegin: false
                }
            }
        }

    });

    // We don't need this and it's really slow to load right now
    // so we'll comment it for the time being
    // grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('quick-js', ['shell:babel']);
    grunt.registerTask('quick-css', ['concat:combine_components', 'sass']);

    grunt.registerTask('quick', ['quick-js', 'quick-css']);
    grunt.registerTask('default', ['quick']);
};