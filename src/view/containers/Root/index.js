import React, { Component } from 'react';
// import PropsType from 'prop-types';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// import configureStore from './configureStore';
// import renderRoutes from './routes/renderRoutes';
// import routes from './routes';

// import { syncHistoryWithStore } from 'react-router-redux';
// import CatchErrorHandler from 'components/CatchErrorHandler';

import renderRoutes from '../../routes';
import reducers from './reducers';

const initialState = {};
export const history = createBrowserHistory();
// export const store = configureStore(initialState, history);
// const connectedHistory = syncHistoryWithStore(history, store, {
//     selectLocationState: state => state.get('routing')
// });

const store = createStore(reducers);

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
