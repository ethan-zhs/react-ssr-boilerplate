const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const path = require('path');
const http = require('http');
const Express = require('express');
const compression = require('compression'); // gizp
const config = require('../../config/webpack.config');

const hooks = require('./utils/hooks');

// 加载hook配置
hooks();

const app = new Express();
const compiler = webpack(config);
app.use(compression({ threshold: 0 }));
app.use(webpackDevMiddleware(
    compiler,
    {
        noInfo: true,
        publicPath: config.output.publicPath
    }
));
app.use(webpackHotMiddleware(compiler));
app.use('/dist', Express.static('./dist'));
app.use('/lib', Express.static(path.join(__dirname, './src/lib')));
app.use('/statics', Express.static(path.join(__dirname, './src/statics')));
app.use('/dll', Express.static('./dll'));
app.get('/*', (req, res) => {
    const serverRender = require('./render/serverRender');
    serverRender(req, res);
});


const PORT = 4999;
const httpServer = http.createServer(app);

httpServer.listen(PORT, function httpS() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
