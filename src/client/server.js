const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const path = require('path');
const http = require('http');
const Express = require('express');
const compression = require('compression'); // gizp
const config = require('../../config/webpack.config');


const app = new Express();
const compiler = webpack(config[0]);
app.use(compression({ threshold: 0 }));

app.use(webpackDevMiddleware(
    compiler,
    {
        noInfo: true,
        publicPath: config[0].output.publicPath
    }
));
app.use(webpackHotMiddleware(compiler));
app.use('/lib', Express.static(path.join(__dirname, './src/lib')));
app.use('/statics', Express.static(path.join(__dirname, './src/statics')));
app.use('/dll', Express.static(path.join(__dirname, '../../dll')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});


const PORT = 3999;
const httpServer = http.createServer(app);

httpServer.listen(PORT, function httpS() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
