module.exports = {
    main: {
        files: [
            { 
                src: '<%= TEMP_DIR %>' + 'README.html',
                dest: '<%= TEMP_DIR %>' + 'index.html'
            }
        ]
    }
};
