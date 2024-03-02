
const path = require('path');

module.exports = {
    entry: './src/index.js',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // TODO: need check if this is correct
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                {
                    loader: 'imports-loader',
                    options: {
                        imports: [
                            // import all modules 
                            "default react React",
                            "named idb openDB",
                            "named react Component",
                            "named react useState",
                            "named react useEffect",
                            "named react useContext",
                            "named react useRef",
                            "default react-dom ReactDOM",
                            "named react-router-dom Link",
                            "named react-router-dom Route",
                            "named react-router-dom BrowserRouter",
                            "named react-copy-to-clipboard CopyToClipboard",
                            "named react-hook-form useForm",
                        ]
                    }
                }
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }

        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
