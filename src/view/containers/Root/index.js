import React, { Component } from 'react';
// import PropsType from 'prop-types';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';

import createBrowserHistory from 'history/createBrowserHistory';

// import configureStore from './configureStore';
// import renderRoutes from './routes/renderRoutes';
// import routes from './routes';

// import { syncHistoryWithStore } from 'react-router-redux';
// import CatchErrorHandler from 'components/CatchErrorHandler';

import renderRoutes from '../../routes';
import reducers from './reducers';
import rootSagas from './sagas';

const initialState = {};
const history = createBrowserHistory();
// export const store = configureStore(initialState, history);
// const connectedHistory = syncHistoryWithStore(history, store, {
//     selectLocationState: state => state.get('routing')
// });

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    sagaMiddleware
];

const enhancers = [
    applyMiddleware(...middlewares)
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production' 
    && typeof window === 'object' 
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(reducers, composeEnhancers(...enhancers));

store.runSaga = sagaMiddleware.run;

rootSagas.map(item => store.runSaga[item]);

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers');
        store.replaceReducer(nextReducer);
    });
}


class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    {renderRoutes()}
                </Router>
            </Provider>
        );
    }    
}

export default Root;
