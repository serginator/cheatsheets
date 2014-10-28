module.exports = function(grunt) {
    grunt.initConfig({
        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: ['**/*.md', '!node_modules/**/*.md'],
                    dest: ['tmp/'],
                    ext: '.html'
                }],
                options: {
                    postCompile: function(src, context) {
                        return src + '<script src=\'http://localhost:35729/' +
                        + 'livereload.js\'></script>\n';
                    }
                }
            }
        },
        watch: {
            md: {
                files: '**/*.md',
                tasks: ['markdown']
            },
            html: {
                files: '**/*.html',
                tasks: [],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['markdown', 'watch']);
}
