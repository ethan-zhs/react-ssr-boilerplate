import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';


import HomePage from '../containers/HomePage';
import FirstPage from '../containers/FirstPage';
import SecondPage from '../containers/SecondPage';


export default function renderRoutes(store) {
	return (
		<Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/first" component={FirstPage}></Route>
            <Route exact path="/second" component={SecondPage}></Route>
        </Switch>
	)
}

