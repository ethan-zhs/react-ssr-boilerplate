import loadable from 'loadable-components';

const routes = [
    {
        path: '/',
        component: loadable(() => import('../containers/Root')),
        routes: [
            {
                path: '/',
                component: loadable(() => import('../containers/HomePage')),
                exact: true,
                moduleName: 'HomePage' 
            },
            {
                path: '/article/:id',
                component: loadable(() => import('../containers/NewsDetailPage/Article')),
                exact: true,
                moduleName: 'NewsDetailPage' 
            },
            {
                path: '/video/:id',
                component: loadable(() => import('../containers/NewsDetailPage/Video')),
                exact: true,
                moduleName: 'NewsDetailPage' 
            },
            {
                path: '/gallery/:id',
                component: loadable(() => import('../containers/NewsDetailPage/Gallery')),
                exact: true,
                moduleName: 'NewsDetailPage' 
            },
            {
                path: '/404',
                component: loadable(() => import('../containers/ErrorPage')),
                layout: {
                    hasNav: false
                },
                exact: true
            }
        ]
    }
];

export default routes;
