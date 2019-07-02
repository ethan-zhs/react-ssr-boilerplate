import React from 'react';
import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';

import routes from './index';


export default function renderRoutes() {
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
                        key={path || index}
                        exact={exact} 
                        path={path}
                        render={props => <route.component {...props} route={route} />}
                    />
                );
            })}

            <Redirect to="/404" />
        </Switch>
    );
}
