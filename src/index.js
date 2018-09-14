import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import configureStore from './configureStore';
// import renderRoutes from './routes/renderRoutes';
// import routes from './routes';
import { Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// import { syncHistoryWithStore } from 'react-router-redux';
// import CatchErrorHandler from 'components/CatchErrorHandler';

import 'babel-polyfill';


const initialState = {};
export const history = createBrowserHistory();
// export const store = configureStore(initialState, history);
// const connectedHistory = syncHistoryWithStore(history, store, {
//     selectLocationState: state => state.get('routing')
// });



class Home extends React.Component {
    render() {
        return (
            <div>Home Page</div>
        )
    }    
}

class First extends React.Component {
    render() {
        return (
            <div>First Page</div>
        )
    }    
}

class Second extends React.Component {
    render() {
        return (
            <div>Second Page</div>
        )
    }    
}


render (
    <div>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/first" component={First}></Route>
                <Route exact path="/second" component={Second}></Route>
            </Switch>
        </Router>
    </div>,
    document.getElementById('root')
);


