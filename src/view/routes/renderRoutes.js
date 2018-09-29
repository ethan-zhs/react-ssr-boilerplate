import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import routes from './index';


export default function renderRoutes(store) {
    return (
        <Switch>
            {routes.map((route, index) => {
                const {
                    exact,
                    path,
                    component
                } = route;

                return (
                    <Route 
                        exact={exact} 
                        path={path}
                        component={component}
                    ></Route>
                );
            })}
        </Switch>
    );
}
