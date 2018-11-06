const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
    mode: argv.mode || process.env.mode || process.env.NODE_ENV || 'development',
    entry: ['./src/js/main.js', './src/scss/main.scss'],
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false // just for debugging
                    }
                }]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        // TODO: pass env variable for PROD and DEV
                        options: {
                            sourceMap: true,
                            config: {
                                path: './postcss.config.js',
                                ctx: { env: this.mode }
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    }
                },
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/assets/fonts',
                to: 'assets/fonts'
            },
        ]),
        new webpack.DefinePlugin({}),
        new HtmlWebPackPlugin({
            template: 'src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        })
    ]
});