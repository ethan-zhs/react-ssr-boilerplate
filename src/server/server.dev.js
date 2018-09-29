import React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getLoadableState } from 'loadable-components/server';

import renderRoutes from '../view/routes/routesServer';
import sagas from '../view/containers/Root/sagas';
import { renderHeader, renderFooter } from './render';
import configureStore from './store';


// gizp
const compression = require('compression');

const path = require('path');
const Express = require('express');
const fs = require('fs');
const http = require('http');

const app = new Express();
const store = configureStore();

app.use(compression({ threshold: 0 }));
app.use('/dist', Express.static('./dist'));
app.use('/lib', Express.static(path.join(__dirname, './src/lib')));
app.use('/statics', Express.static(path.join(__dirname, './src/statics')));
app.use('/dll', Express.static(path.join(__dirname, './dll')));
app.get('/*', async (req, res) => {
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

    const loadableState = await getLoadableState(appWithRouter);
    const helmet = Helmet.renderStatic();
    const preloadedState = store.getState();
    
    res.write(renderHeader(helmet));
    const stream = renderToNodeStream(appWithRouter);
    stream.pipe(res, { end: false });
    stream.on('end', () => {
        res.write(renderFooter(loadableState, preloadedState));
        res.end();
    });
});


const PORT = 4999;
const httpServer = http.createServer(app);

httpServer.listen(PORT, function httpS() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
