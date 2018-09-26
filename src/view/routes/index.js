import loadable from 'loadable-components';


const routes = [
    {
        path: '/',
        component: loadable(() => import('../containers/HomePage')),
        exact: true
    },
    {
        path: '/first',
        component: loadable(() => import('../containers/FirstPage')),
        exact: true
    },
    {
        path: '/second',
        component: loadable(() => import('../containers/SecondPage')),
        exact: true
    }
];

export default routes;
