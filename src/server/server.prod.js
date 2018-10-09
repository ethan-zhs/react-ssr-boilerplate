// gizp
const compression = require('compression');
const path = require('path');
const Express = require('express');
const fs = require('fs');
const http = require('http');
const serverRender = require('./render/serverRender');

const app = new Express();

app.use(compression({ threshold: 0 }));
app.use('/dist', Express.static('./dist'));
app.use('/lib', Express.static(path.join(__dirname, './src/lib')));
app.use('/statics', Express.static(path.join(__dirname, './src/statics')));
app.use('/dll', Express.static('./dll'));
app.use('*', (req, res) => serverRender(req, res));


const PORT = 4999;
const httpServer = http.createServer(app);

httpServer.listen(PORT, function httpS() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
