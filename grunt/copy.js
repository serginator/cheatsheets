module.exports = {
    all: {
        files: [
            {
                expand: true,
                cwd: 'graphical/',
                src: ['**/*'],
                dest: '<%= TEMP_DIR %>' + 'graphical/'
            },
            {
                expand: true,
                cwd: 'res/',
                src: ['**/*'],
                dest: '<%= TEMP_DIR %>' + 'res/'
            }
        ]
    }
};
