module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        stylus: {
            compile: {
                files: {
                    "app/css/bootstrap.css": "app/lib/bootstrap-stylus/stylus/bootstrap.styl",
                    "app/css/app.css": "app/css/styl/app.styl"
                }
            }
        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-stylus');
    // tasks
    grunt.registerTask('default', 'stylus');

};