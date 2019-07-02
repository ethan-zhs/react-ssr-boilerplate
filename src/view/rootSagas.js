import { fork, all } from 'redux-saga/effects';
import routesList from './routes';

const sagas = [];
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

moduleList = Array.from(new Set(moduleList));

moduleList.map(item => {    
    if (require(`./containers/${item}/sagas`).default) { 
        sagas.push(require(`./containers/${item}/sagas`).default);
    }
    
    return null;
});

// 全局saga任务
sagas.push(require('./global/sagas').default);

const moduleSaga = sagas.map((item) => fork(item));

export default function* () {
    yield all([
        ...moduleSaga
    ]);    
}
