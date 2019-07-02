import Cookie from 'js-cookie';
import uuid from 'uuid/v1';

/**
 *  保存用户信息至sessionStorage
 * 
 *  @param [object] userData [user 对象]
*/
function saveUser(userData) {
    if (typeof userData === 'object' && userData) {
        userData = JSON.stringify(userData);
        Cookie.set('USER', userData, { expires: 7 });
    }
}


// 获得本地sessionStorage用户信息
function getUser() {
    if (typeof window === 'object' && Cookie.get('USER')) {
        return JSON.parse(Cookie.get('USER'));
    }
    return false;
}


// 获得JWT
function getJWT() {
    if (typeof window === 'object' && Cookie.get('USER')) {
        const user = JSON.parse(Cookie.get('USER'));
        return 'Bearer ' + user.jwt;
    }

    return false;
}


// 退出登录
function logout() {
    if (typeof window === 'object') {
        Cookie.remove('USER');
        window.location.href = window.location.pathname;
    }    
}


// 获得deviceId
function getDeviceId() {
    if (typeof window !== 'object') return false;
    if (Cookie.get('DEVICEID')) {
        return Cookie.get('DEVICEID');
    }
    return createDeviceId();
}


// 创建DeviceId
function createDeviceId() {
    const deviceId = `WEB_${uuid()}`;
    Cookie.set('DEVICEID', deviceId, { expires: 30 });
    return deviceId;
}

export default {
    saveUser,
    getUser,
    getJWT,
    logout,
    getDeviceId,
    createDeviceId
};
