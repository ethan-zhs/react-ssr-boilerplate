import { matchPath, Router } from 'react-router';

// ensure we're using the exact code for default root match
const { computeMatch } = Router.prototype;

const matchRoutes = (routes, pathname, branch = []) => {
    routes.some(route => {
        let matchStr = computeMatch(pathname);
        if (route.path) {
            matchStr = matchPath(pathname, route);
        } else if (branch.length) {
            matchStr = branch[branch.length - 1].match;
        }
        if (matchStr) {
            branch.push({ route, matchStr });
            if (route.routes) {
                matchRoutes(route.routes, pathname, branch);
            }
        }
        return matchStr;
    });
    return branch;
};
export default matchRoutes;
