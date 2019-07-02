import { call, put, fork } from 'redux-saga/effects';
import * as Api from 'Services/index';
import * as GlobalActionTypes from 'Global/actions';
import * as ActionTypes from './actions';
import { isCorrectSid } from './constants';


function* getNewsContent(args) {    
    try {
        const res = yield call(Api.getNewsContent, { sid: args.sid });
        yield put(ActionTypes.getNewsContent.success(args, res));

        // 设置访问为SSR
        yield put(GlobalActionTypes.prefetchSet());

        const { title, summary = '', tagsJsonArray } = res.thisNews;
        const keywords = res.keywords ? ',' + res.keywords : '';
        const description = summary.length ? summary + ',' : '';
        const tagArray = tagsJsonArray !== '' ? JSON.parse(tagsJsonArray) : [];

        // 设置SEO内容
        yield put(GlobalActionTypes.seoSet({
            title: `${title}${tagArray.length > 0 ? ',' + tagArray[0] : ''},触电新闻`,
            metaTitle: `${title}${tagArray.length > 0 ? ',' + tagArray[0] : ''},触电新闻`,
            metaKeywords: `${title}${keywords}`,
            metaDescription: `${description}${title}${keywords}`
        }));
    } catch (error) {
        yield put(ActionTypes.getNewsContent.failure(args, error));
    }
}

function* getHotNews(args) {
    try {
        const res = yield call(Api.getHotNews, {
            snapShotNumber: 0,
            pageSize: 10,
            pageNum: 1,
            getPages: 1
        });

        yield put(ActionTypes.getHotNews.success(args, res));

        // 设置访问为SSR
        yield put(GlobalActionTypes.prefetchSet());
    } catch (error) {
        yield put(ActionTypes.getHotNews.failure(args, error));
    }
}

export default function* firstSaga(args) {
    const { pathName } = args;
    const TYPE_ENUM = ['/video/', '/article/', '/gallery/'];

    TYPE_ENUM.forEach(item => {
        if (pathName.indexOf(item) >= 0) {
            const [, sid] = pathName.split(item);
            args.sid = sid;
        }        
    });

    if (isCorrectSid(args.sid)) {
        yield fork(getNewsContent, args);
        yield fork(getHotNews, args);
    }  
}
