const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/background.js',
    output: {
        filename: 'background.bundle.js',
        path: path.resolve(__dirname, 'build')
    }
};