import { combineReducers } from 'redux-immutable';
import routesList from './routes';

const reducers = {};
let moduleList = [];

function mapModules(routes) {
    routes.map(item => {   
        const { moduleName } = item; 
        if (moduleName) {
            moduleList.push(moduleName);
        }
        
        if (item.routes) {
            mapModules(item.routes);
        }    
        return null;  
    });
}

mapModules(routesList);

// 引入模块去重
moduleList = Array.from(new Set(moduleList));

moduleList.map(item => {    
    const moduleReducer = require(`./containers/${item}/reducers`);
    if (moduleReducer.default || moduleReducer) { 
        reducers[item] = moduleReducer.default ? moduleReducer.default : moduleReducer;
    }    
    return null;
});

// 全局reducer
const globalReducer = require('./global/reducers');

reducers.global = globalReducer.default ? globalReducer.default : globalReducer;

export default combineReducers(reducers);
