const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html',
            filename: './index.html'
        })
    ]
};
