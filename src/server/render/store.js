import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import rootReducers from 'View/rootReducers';

const sagaMiddleware = createSagaMiddleware();

const createHistory = require('history').createMemoryHistory;

const reduxMiddlewares = [
    routerMiddleware(createHistory()),
    sagaMiddleware,
];

export default (initialState) => {
    const store = createStore(
        rootReducers,
        initialState,
        compose(applyMiddleware(...reduxMiddlewares)),
    );

    store.runSaga = sagaMiddleware.run;

    store.close = () => store.dispatch(END);

    return store;
};
