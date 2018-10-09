const isProd = process.env.NODE_ENV == 'production';

module.exports = isProd ? require('./webpack.prod.config') : require('./webpack.dev.config');