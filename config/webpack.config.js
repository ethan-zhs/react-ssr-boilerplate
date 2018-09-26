const path = require('path')
const webpack = require('webpack')

const config = {
    clientConfig: {
        devtool: 'inline-source-map', 
        entry: {
            client: path.join(__dirname, '../src/client/index.js'),
            vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'redux-saga', 'react-redux']
        },

        output: {
            path: path.join(__dirname, '../dist/client'),
            filename: '[name].js',
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
                }
            ]
        },

        plugins: [
            
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: "vendor",
                        chunks: "initial",
                        minChunks: 2
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