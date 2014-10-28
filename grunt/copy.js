module.exports = {
    all: {
        files: [
            {
                expand: true,
                cwd: 'graphical/',
                src: ['**/*'],
                dest: '<%= TEMP_DIR %>' + 'graphical/'
            }
        ]
    }
};
