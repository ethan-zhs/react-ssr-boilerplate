const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const fs = require('fs');
const path = require('path');
const http = require('http');
const Express = require('express');
const compression = require('compression'); // gizp
const webpackconfig = require('../../config/webpack.dev.config');

const hooks = require('./utils/hooks');


// 加载hook配置
hooks();

const app = new Express();
const config = webpackconfig('server');
const compiler = webpack(config);
app.use(compression({ threshold: 0 }));
app.use(webpackDevMiddleware(
    compiler,
    {
        noInfo: true,
        publicPath: config.output.publicPath
    }
));
app.use('/dist', Express.static('./dist'));
app.use('/lib', Express.static(path.join(__dirname, './src/lib')));
app.use('/statics', Express.static(path.join(__dirname, './src/statics')));
app.use('/dll', Express.static('./dll'));

app.get('/*', (req, res) => {
    const serverRender = require('./render/serverRender');
    console.log('server render start...');
    serverRender(req, res);
});

const PORT = 5999;
const httpServer = http.createServer(app);

httpServer.listen(PORT, function httpS() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
