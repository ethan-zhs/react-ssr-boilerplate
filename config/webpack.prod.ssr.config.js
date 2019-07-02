const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';


const config = {
    entry: path.join(__dirname, '../src/server/server.prod'),

    output: {
        path: path.join(__dirname, '../dist/server'),
        filename: 'server-www.js',
        publicPath: '/'
    },

    target: 'node',

    node: {
        __filename: true,
        __dirname: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]-[hash:base64:5]',
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                }),
                include: path.join(__dirname, '../src'),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                }),
                include: path.join(__dirname, '../node_modules/swiper/dist/css')
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]-[hash:base64:5]',
                                importLoaders: 1
                            }
                        },
                        'less-loader',
                        'postcss-loader'
                    ]
                }),
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.(jpe?g|png|ico|gif|woff|woff2|eot|ttf|svg|swf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name][hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    externals:{ 
        videojs: 'videojs'
    },
    plugins: [               
        new ExtractTextPlugin({
            filename: 'css/[name]_[hash:8].css',
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer]
            }
        })
    ]
};

module.exports = config;