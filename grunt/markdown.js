module.exports = {
    all: {
        files: [{
            expand: true,
            src: ['**/*.md', '!node_modules/**/*.md'],
            dest: 'tmp/',
            ext: '.html'
        }],
        options: {
            postCompile: function(src, context) {
                var out = src.replace(/\.md/gi, '.html');
                return out + '<script src=\'http://localhost:35729/livereload.js\'></script>\n';
            },
            markdownOptions: {
                gfm: true
            }
        }
    }
};
