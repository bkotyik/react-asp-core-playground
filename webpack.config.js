var path = require('path');

module.exports = {
    context: path.join(__dirname, 'Content'),
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'wwwroot/js'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            // Transform JSX in .jsx files
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        ],
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['.js', '.jsx']
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
    }
};
