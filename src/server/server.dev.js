import React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';

import renderRoutes from '../view/routes';
import reducers from '../view/containers/Root/reducers';

const store = createStore(reducers);

// gizp
const compression = require('compression');

const path = require('path');
const Express = require('express');
const fs = require('fs');
const http = require('http');

const app = new Express();

app.use(compression({ threshold: 0 }));
app.use('/lib', Express.static(path.join(__dirname, './src/lib')));
app.use('/statics', Express.static(path.join(__dirname, './src/statics')));
app.use('/dll', Express.static(path.join(__dirname, './dll')));
app.get('/*', (req, res) => {
    const context = {};

    const appWithRouter = (
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                {renderRoutes()}
            </StaticRouter>
        </Provider>
    );

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    res.write('<html></head><title>Page</title></head><body><div id="root">');
    const stream = renderToNodeStream(appWithRouter);
    stream.pipe(res, { end: 'false' });
    stream.on('end', () => {
        res.end('</div></body></html>');
    });

    // const html = renderToString(<appWithRouter/>);
    // fs.readFile('../tpl/index.tpl.html', 'utf-8', (err, data) => {
    //     if (err) throw err;

    //     // 把渲染后的 React HTML 插入到 div 中
    //     const document = data.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
    
    //     // 把响应传回给客户端
    //     res.send(document);
    // })
});


const PORT = 4999;
const httpServer = http.createServer(app);

httpServer.listen(PORT, function httpS() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
