import { 
    call, put, fork, takeEvery, takeLatest 
} from 'redux-saga/effects';
import * as Api from 'Services/index';
import { delay } from 'redux-saga';

import * as ActionTypes from './actions';


function* getNewsContent(action) {
    try {
        const res = yield call(Api.getNewsContent, action.data);       
        yield put(ActionTypes.getNewsContent.success(action, res));
    } catch (error) {
        yield put(ActionTypes.getNewsContent.failure(action, error));
    }
}

function* vote(action) {
    try {
        const res = yield call(Api.vote, action.data.params);
        yield call(delay, 1000);
        action.data.callback && action.data.callback({
            success: true
        });
        yield put(ActionTypes.vote.success(action, res));
    } catch (error) {        
        yield put(ActionTypes.vote.failure(action, error));
        action.data.callback && action.data.callback({
            success: false,
            ...error
        });
    }
}

function* getHotNews(action) {
    try {
        const res = yield call(Api.getHotNews, action.data);
        yield put(ActionTypes.getHotNews.success(action, res));
    } catch (error) {
        yield put(ActionTypes.getHotNews.failure(action, error));
    }
}


function* watchAll() {
    yield takeLatest(ActionTypes.GET_NEWS_CONTENT.REQUEST, getNewsContent);
    yield takeLatest(ActionTypes.GET_HOT_NEWS.REQUEST, getHotNews);
    yield takeLatest(ActionTypes.VOTE.REQUEST, vote);
}

export default function* newsDetailSaga() {
    yield fork(watchAll);
}
