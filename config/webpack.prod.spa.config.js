const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';


const config = merge(base, {
    devtool: 'source-map', 
    entry: {
        client: path.join(__dirname, '../src/client/index.js'),
        vendor: [
            'react', 
            'react-dom', 
            'react-router-dom', 
            'redux', 
            'redux-saga', 
            'react-redux',
            'immutable', 
            'redux-immutable',
            'crypto-js',
            'reselect',
            'react-router-redux'
        ],
    },

    output: {
        filename: 'js/[name]_[hash:8].js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                // dom7 / swiper 有es6语法，需要打包解析
                include: [
                    path.join(__dirname, '../src'), 
                    path.join(__dirname, '../node_modules/dom7'), 
                    path.join(__dirname, '../node_modules/swiper')
                ]
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

    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer]
            }
        }),

        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: '/html/'
        }),

        new ExtractTextPlugin({
            filename: 'css/[name]_[hash:8].css',
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/client/template/index.tpl.html'),
            filename: 'index.html',
            inject: false,
            minify: false
        }),

        new CopyWebpackPlugin([
            {from: 'doc/'}
        ]),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma:8,
                    output: {
                        comments: false, // 保留注释
                        beautify: false  // 不需要格式化
                    },
                    compress: {
                        warnings: false, // 删除无用代码时不输出警告
                        drop_console: true, // 去除console
                        collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
                        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                    }
                }
            })
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks:{
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: true,
                    test: /[\\/]node_modules[\\/]/,
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
});

module.exports = config;