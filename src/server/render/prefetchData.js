import { fork } from 'redux-saga/effects';
import { matchPath } from 'react-router-dom';
import globalSagas from 'Global/prefetch';

// 获取组件prefetch的saga任务
export default function prefetchData(url, routes) {
    let routeList = [];
    routes.filter(item => item.routes).forEach(item => {
        routeList = routeList.concat(item.routes);
    });

    const currRoute = routeList.map((route) => ({ route, match: matchPath(url, route) }))
        .filter(({ route, match }) => match && route.component.prefetch);   

    if (currRoute.length && currRoute[0].route.component.prefetch) {
        const params = { 
            pathName: url, 
            isPrefetch: true 
        };

        return function* fetchData() {
            yield fork(globalSagas, params);
            yield fork(currRoute[0].route.component.prefetch, params);
        };
    }
    return undefined;
}
