const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';


const config = {
    clientConfig: merge(base, {
        // devtool: 'inline-source-map', 
        entry: {
            client: path.join(__dirname, '../src/client/index.js'),
        },

        output: {
            filename: 'js/[name]_[hash:8].js'
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
                            'less-loader'
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
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),

            // new webpack.optimize.UglifyJsPlugin({
            //     // 需要在LoaderOptionsPlugin中匹配minize
            //     sourceMap: true,
            //     // 最紧凑的输出
            //     beautify: false,
            //     // 删除所有的注释
            //     comments: false,
            //     compress: {
            //         // 在UglifyJs删除没有用到的代码时不输出警告  
            //         warnings: false,
            //         // 删除所有的 `console` 语句
            //         // 还可以兼容ie浏览器
            //         drop_console: true,
            //     },
            // }),
    
            new ExtractTextPlugin({
                filename: 'css/[name]_[hash:8].css',
                allChunks: true
            }),

            new HtmlWebpackPlugin({
                template: path.join(__dirname, '../src/tpl/index.tpl.html'),
                filename: 'index.html',
                inject: true,
            })
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5, // The default limit is too small to showcase the effect
                        minSize: 0, // This is example is too small to create commons chunks
                        name: 'common'
                    }
                }
            }
        },
        
    }),
    serverConfig: {
        entry: path.join(__dirname, '../src/server/server.prod'),

        output: {
            path: path.join(__dirname, '../dist/server'),
            filename: 'server.js'
        },

        target: 'node',

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader?cacheDirectory=true'
                    },
                    include: path.join(__dirname, '../src')
                }
            ]
        },

        plugins: [

        ]
    }
}

module.exports = [config.clientConfig, config.serverConfig]