import {
    takeEvery, takeLatest, put, call, fork, cancel, race 
} from 'redux-saga/effects';

import * as Api from '../../services';
import * as ActionTypes from './actions';

const first = true; // 记录是否第一次获取数据，用于新闻展示埋点

function* getIndexBanner(action) {
    try {
        const res = yield call(Api.getIndexBanner, action.data);
        yield put(ActionTypes.getIndexBanner.success(res));
    } catch (err) {
        yield put(ActionTypes.getIndexBanner.failure(err));
    }
}


function* getIndexHots(action) {
    try {
        const res = yield call(Api.getIndexHots, action.data);
        yield put(ActionTypes.getIndexHots.success(res));
    } catch (err) {
        yield put(ActionTypes.getIndexHots.failure(err));
    }
}


function* getIndexLatest(action) {
    try {
        const res = yield call(Api.getIndexLatest, action.data);
        yield put(ActionTypes.getIndexLatest.success(res));
    } catch (err) {
        yield put(ActionTypes.getIndexLatest.failure(err));
    }
}


function* getIndexPush(action) {
    try {
        const res = yield call(Api.getIndexPush, action.data.params);
        yield put(ActionTypes.getIndexPush.success(res));
        action.data.callback && action.data.callback();
    } catch (err) {
        yield put(ActionTypes.getIndexPush.failure(err));
    }
}

function* getFriendLinks(action) {
    try {
        const res = yield call(Api.getFriendLinks, action.data);
        yield put(ActionTypes.getFriendLinks.success(action, res));
    } catch (error) {
        yield put(ActionTypes.getFriendLinks.failure(action, error));
    }
}


function* watchAll() {
    yield takeLatest(ActionTypes.GET_INDEX_HOTS.REQUEST, getIndexHots);
    yield takeLatest(ActionTypes.GET_INDEX_LATEST.REQUEST, getIndexLatest);
    yield takeLatest(ActionTypes.GET_INDEX_PUSH.REQUEST, getIndexPush);
    yield takeLatest(ActionTypes.GET_INDEX_BANNER.REQUEST, getIndexBanner);
    yield takeLatest(ActionTypes.GET_FRIEND_LINKS.REQUEST, getFriendLinks);
}

export default function* HomePage() {
    yield fork(watchAll);
}
