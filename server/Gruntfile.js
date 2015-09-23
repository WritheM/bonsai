module.exports = function (grunt) {
    grunt.initConfig({
        mkdir: {
            bin: ["bin"]
        },
        shell: {
            babel: {
                command: "node node_modules/babel/bin/babel.js --stage 0 --out-dir bin src"
            }
        },
        watch: {
            quick: {
                files: ["src/**.js"],
                tasks: ["default"],
                options: {
                    spawn: false,
                    atBegin: true,
                    debounceDelay: 10
                }
            }
        },
        clean: {
            build: ["bin"]
        }
    });

    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", [
        "mkdir:bin",
        "shell:babel"
    ]);
};