import React from 'react';
import { Provider } from 'react-redux';

import { renderToNodeStream, ReactDOMServer } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getLoadableState } from 'loadable-components/server';

import renderRoutes from 'View/routes/renderRoutes';
import routes from 'View//routes';
import { renderHeader, renderFooter } from './serverRenderTpl';
import configureStore from './store';
import prefetchData from './prefetchData';
import { getHelmetData } from '../utils/helmet';


export default async (req, res, isProd = false) => { 
    const store = configureStore();
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

    // 等待按需组件初始化完成
    const loadableState = await getLoadableState(appWithRouter); 

    // 拿当前路由下需要prefetch 的saga任务
    const prefetchSaga = prefetchData(req.url, routes);

    // 等待执行saga操作    
    prefetchSaga && await store.runSaga(prefetchSaga).done;
    console.log('sagas load compelete ...');   
    
    // 开始服务端渲染
    const helmet = Helmet.renderStatic();
    const preloadedState = store.getState();

    const helmetData = getHelmetData(helmet, preloadedState);

    const buildPath = isProd ? require('../../../dist/html/asset-manifest.json') : {};

    // console.log(preloadedState);
    res.write(renderHeader(helmetData, isProd, buildPath));

    const stream = renderToNodeStream(appWithRouter);
    stream.pipe(res, { end: false });
    stream.on('end', () => {
        res.write(renderFooter(loadableState, preloadedState, isProd, buildPath));
        res.send();
    }); 
    
    store.close();   
};
