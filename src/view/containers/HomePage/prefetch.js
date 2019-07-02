import {
    put, call, fork 
} from 'redux-saga/effects';

import * as Api from 'Services/index';
import * as GlobalActionTypes from 'Global/actions';
import * as ActionTypes from './actions';

function* getIndexBanner(args) {
    try {
        const res = yield call(Api.getIndexBanner, undefined);
        yield put(ActionTypes.getIndexBanner.success(res));
        
        // 设置访问为SSR
        yield put(GlobalActionTypes.prefetchSet());
    } catch (err) {
        yield put(ActionTypes.getIndexBanner.failure(err));
    }
}


function* getIndexHots(args) {
    try {
        const res = yield call(Api.getIndexHots, {
            size: 6
        });
        yield put(ActionTypes.getIndexHots.success(res));

        // 设置访问为SSR
        yield put(GlobalActionTypes.prefetchSet());
    } catch (err) {
        yield put(ActionTypes.getIndexHots.failure(err));
    }
}


function* getIndexLatest(action) {
    try {
        const res = yield call(Api.getIndexLatest, {
            size: 6
        });
        yield put(ActionTypes.getIndexLatest.success(res));

        // 设置访问为SSR
        yield put(GlobalActionTypes.prefetchSet());
    } catch (err) {
        yield put(ActionTypes.getIndexLatest.failure(err));
    }
}

function* getIndexPush(args) {
    try {
        const res = yield call(Api.getIndexPush, {
            size: 24,
            channelId: 0
        });
        yield put(ActionTypes.getIndexPush.success(res));

        // 设置访问为SSR
        yield put(GlobalActionTypes.prefetchSet());
    } catch (err) {
        yield put(ActionTypes.getIndexPush.failure(err));
    }
}

function* getFriendLinks(args) {
    try {
        const res = yield call(Api.getFriendLinks, undefined);
        yield put(ActionTypes.getFriendLinks.success(args, res));

        // 设置访问为SSR
        yield put(GlobalActionTypes.prefetchSet());
    } catch (error) {
        yield put(ActionTypes.getFriendLinks.failure(args, error));
    }
}

export default function* HomePagePrefetch(args) {
    yield fork(getIndexBanner, args);
    yield fork(getIndexHots, args);
    yield fork(getIndexLatest, args);
    yield fork(getIndexPush, args);
    yield fork(getFriendLinks, args);
}
