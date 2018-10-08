import React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getLoadableState } from 'loadable-components/server';

import renderRoutes from '../../view/routes/routesServer';
import sagas from '../../view/containers/Root/sagas';
import { renderHeader, renderFooter } from './serverRenderTpl';
import configureStore from './store';

const store = configureStore();

module.exports = async (req, res) => {
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
};
