const isProd = process.env.NODE_ENV == 'production';
console.log('xxxxxxxxxxxxxxx', isProd);

module.exports = isProd ? require('./webpack.prod.config') : require('./webpack.dev.config');