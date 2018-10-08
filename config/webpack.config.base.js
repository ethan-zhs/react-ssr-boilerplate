const path = require('path');
const webpack = require('webpack');
const FreiendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';

module.exports = {
    output: {
        path: path.join(__dirname, '../dist/client'),
        publicPath: '/dist/client/',
        filename: '[name].[hash:8].js',
        chunkFilename: 'chunks/[name][hash:8].chunk.js',
        sourceMapFilename: 'sourceMaps/[name][hash:8].map'
    },
    resolve: {
        alias: {
            public: path.resolve(__dirname, '../src/view/statics'),
            components: path.resolve(__dirname, '../src/view/components'),
            containers: path.resolve(__dirname, '../src/view/containers'),
            constants: path.resolve(__dirname, '../src/view/constants'),
            globalData: path.resolve(__dirname, '../src/view/global'),
            utils: path.resolve(__dirname, '../src/view/utils'),
            hoc: path.resolve(__dirname, '../src/view/hoc'),
            services: path.resolve(__dirname, '../src/view/services')
        }
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                loader: 'eslint-loader',
                test: /.js$/,
                enforce: 'pre',
                include: path.join(__dirname, '..', 'src'),
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }
        ]
    },
    plugins: isProd
        ? []
        : [
            new FreiendlyErrorsPlugin()
        ]
};
