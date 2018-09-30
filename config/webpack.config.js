const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')


const config = {
    clientConfig: {
        // devtool: 'inline-source-map', 
        entry: {
            client: ['webpack-hot-middleware/client?reload=true', 'babel-polyfill', path.join(__dirname, '../src/client/index.js')],
        },

        output: {
            path: path.join(__dirname, '../dist/client'),
            filename: '[name].js',
            publicPath: '/dist/client/',
            // chunkFilename: 'chunks/[name][hash:8].chunk.js'
        },

        module: {
            noParse: /es6-promise\.js$/,
            rules: [
                {
                    loader: 'eslint-loader',
                    test: /.js$/,
                    enforce: 'pre',
                    include: path.join(__dirname, '../src'),
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader?cacheDirectory=true'
                    },
                    include: path.join(__dirname, '../src')
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {   
                                importLoaders: 1,    
                                modules: true,
                                localIdentName: '[name]__[local]-[hash:base64:5]'
                            }
                        },
                        'postcss-loader'
                    ],
                    include: path.join(__dirname, '../src')
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
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
                    ],
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
            // hints: isProd ? 'warning' : false
        },

        plugins: [
            // webpack热更新组件
            new webpack.HotModuleReplacementPlugin(),

            new webpack.LoaderOptionsPlugin({
                options: {
                    context: __dirname,
                    postcss: [autoprefixer]
                }
            }),

            new webpack.DllReferencePlugin({ 
                manifest: require('../dll/vendor-manifest.json')
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
        
    },
    serverConfig: {
        entry: path.join(__dirname, '../src/server/server.dev'),

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