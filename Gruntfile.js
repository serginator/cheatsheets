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

    grunt.registerTask('default', 'Watchs content and launches server.', [
        'clean',
        'markdown',
        'connect',
        'watch'
    ]);
}
