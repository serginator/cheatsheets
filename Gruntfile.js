module.exports = function(grunt) {
    var path = require('path');
    
    require('load-grunt-tasks')(grunt);
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        init: true,
        data: {
            TEMP_DIR: 'tmp/'
        },
        loadGruntTasks: {
            config: require('./package.json'),
            scope: 'devDependencies'
        }
    });

    grunt.registerTask('build', 'Builds local files', [
        'clean',
        'copy',
        'markdown'
    ]);

    grunt.registerTask('pages', 'Uploads content to gh-pages', [
        'build',
        'gh-pages'
    ]);

    grunt.registerTask('default', 'Watchs content and launches server.', [
        'build',
        'connect',
        'watch'
    ]);
}
