import { 
    put, call, fork, takeLatest, all 
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import userUtils from 'Utils/userUtils';

import * as Api from 'Services/index';
import * as ActionTypes from './actions';

function* getChannelFlow(action) {
    try {
        const res = yield call(Api.getChannel);

        // 去除‘本地’和‘订阅’两个频道
        const channelFilterList = res.list.filter((v) => v.channelId !== -3 && v.channelId !== 531);

        const channelList = {
            all: channelFilterList,
            nav: channelFilterList.slice(0, 7),
            more: channelFilterList.slice(7, channelFilterList.length)
        };

        yield put(ActionTypes.getChannel.success(action.data, channelList));
    } catch (err) {
        yield put(ActionTypes.getChannel.failure(action.data, err));
    }
}

function* login(action) {
    try {
        const res = yield call(Api.login, action.data.params);
        yield call(userUtils.saveUser, res);
        yield call(delay, 1000);
        yield put(ActionTypes.login.success(action.data.params, res));
    } catch (err) {
        action.data.callback && action.data.callback(err);
        yield put(ActionTypes.login.failure(action.data.params, err));
    }
}

function* thirdPartLogin(action) {
    try {
        const res = yield call(Api.thirdPartLogin, action.data.params);
        yield call(userUtils.saveUser, res);
        yield put(ActionTypes.thirdPartLogin.success(action.data.params, res));
    } catch (err) {
        action.data.callback && action.data.callback(err);
        yield put(ActionTypes.thirdPartLogin.failure(action.data.params, err));
    }
}

function* watchAll() {
    yield takeLatest(ActionTypes.GET_CHANNEL.REQUEST, getChannelFlow);
    yield takeLatest(ActionTypes.LOGIN.REQUEST, login);
    yield takeLatest(ActionTypes.THIRD_PART_LOGIN.REQUEST, thirdPartLogin);
}

export default function* globalSaga() {
    yield fork(watchAll);
}
