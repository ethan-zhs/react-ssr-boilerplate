import React from 'react';
import { hydrate } from 'react-dom';

import 'babel-polyfill';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import logger from 'redux-logger';

import renderRoutes from 'View/routes/renderRoutes';
import reducers from 'View/rootReducers';
import sagas from 'View/rootSagas';

const initialState = fromJS(window.__PRELOADED_STATE__);
const createHistory = require('history').createBrowserHistory;

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    sagaMiddleware
];

// 开发环境加入redux-logger
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

const enhancers = [
    applyMiddleware(...middlewares)
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production' 
    && typeof window === 'object' 
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(reducers, initialState, composeEnhancers(...enhancers));

store.runSaga = sagaMiddleware.run;
store.runSaga(sagas);

store.injectedReducers = {};
store.injectedSagas = {};

if (module.hot) {
    module.hot.accept('View/rootReducers', () => {
        const nextReducer = require('View/rootReducers');
        store.replaceReducer(nextReducer);
    });
}


hydrate(
    <Provider store={store}>
        <Router history={history}>
            {renderRoutes()}
        </Router>
    </Provider>,
    document.getElementById('root')
);
