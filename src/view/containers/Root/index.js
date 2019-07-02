import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';

import prefetchSaga from 'Global/prefetch';
import Layout from 'Containers/Layout';
import 'Public/css/global.less';

import matchRoutes from '../../routes/matchRoutes';

/**
 * PageName: 外层路由渲染
 * 
 * Author: zhuhuishao 
 * use: [ 外层路由展示 ]
 * 
*/
class Root extends Component {
    static prefetch = prefetchSaga;

    render() {
        const { route, location, history } = this.props;

        let layout = {
            hasNav: true,
            hasHeader: true
        };
        const matchRoutesList = matchRoutes(this.props.route.routes, location.pathname);
        if (matchRoutesList.length) {
            layout = Object.assign(layout, matchRoutesList[matchRoutesList.length - 1].route.layout || {});
        }

        return (
            <Layout {...this.props} layout={layout}>
                <Switch>                    
                    {route.routes && route.routes.map(item => (
                        <Route key={item.path} path={item.path} exact={item.exact} component={item.component}></Route>
                    ))}  
                    <Redirect to='/404' />                  
                </Switch>
            </Layout>
        );
    }    
}

export default Root;
