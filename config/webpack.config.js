const path = require('path')
const fs = require('fs')

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`

            return externals
        }, {})
}

const config = [{
    entry: path.join(__dirname, '../src/index.js'),

    output: {
        path: path.join(__dirname, '../dist/client'),
        filename: 'bundle.js'
    },

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
},
{
    entry: path.join(__dirname, '../src/server/server.prod'),

    output: {
        path: path.join(__dirname, '../dist/server'),
        filename: '[name].js'
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
}]

module.exports = config