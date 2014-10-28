module.exports = {
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
};