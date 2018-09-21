// 字符串全大写下划线分割转驼峰
function camelString(Upper) {
    const _tmpString = Upper.split('_');
    const camelStringArr = [];

    _tmpString.map((item, i) => {
        let newItem = item.toLowerCase();
        if (i) {
            newItem = newItem.substring(0, 1).toUpperCase() + newItem.substring(1, newItem.length);
        }
        camelStringArr.push(newItem);
        return undefined;
    });
    return camelStringArr.join('');
}

// 构造对象action
export function action(type, payload = {}) {
    return { type, ...payload };
}

// 构造异步三个action的types
export function apiTypes(namespace) {
    return {
        REQUEST: namespace + '_REQUEST',
        SUCCESS: namespace + '_SUCCESS',
        FAILURE: namespace + '_FAILURE'
    };
}

// 构造异步action creator
export function apiCreator(types) {
    const { REQUEST, SUCCESS, FAILURE } = types;
    return {
        request: data => action(REQUEST, { data }),
        success: (data, response) => action(SUCCESS, { data, response }),
        failure: (data, error) => action(FAILURE, { data, error })
    };
}

// 返回三个action以及三个action creator
// 输入为全大写下划线分割，
// 输出一个action对象全大写，另一个是驼峰
export function apiAction(namespace, moduleName) {
    const camel = camelString(namespace);
    const obj = {};
    let name = null;
    if (moduleName) {
        name = moduleName + '_' + namespace;
    } else {
        name = namespace;
    }
    obj[namespace] = apiTypes(name);
    obj[camel] = apiCreator(obj[namespace]);

    return obj;
}
