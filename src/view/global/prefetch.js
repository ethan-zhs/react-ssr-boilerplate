import { call, put, fork } from 'redux-saga/effects';
import * as Api from 'Services/index';
import * as ActionTypes from './actions';

function* getChannelFlow(args) {
    try {
        const res = yield call(Api.getChannel);

        // 去除‘本地’和‘订阅’两个频道
        const channelFilterList = res.list.filter((v) => v.channelId !== -3 && v.channelId !== 531);

        const channelList = {
            all: channelFilterList,
            nav: channelFilterList.slice(0, 7),
            more: channelFilterList.slice(7, channelFilterList.length)
        };
        
        yield put(ActionTypes.getChannel.success(args, channelList));
        
        // 设置访问为SSR
        yield put(ActionTypes.prefetchSet());

        if (args.channelId) {
            const currChannel = channelFilterList.find(item => item.alias === args.channelId || item.channelId == args.channelId) || {};

            // 设置SEO内容
            yield put(ActionTypes.seoSet({
                title: `${currChannel.channelName} - 触电新闻`,
                metaTitle: `${currChannel.channelName} - 触电新闻`,
                metaKeywords: currChannel.channelKeywords || '触电新闻，新闻频道，新闻资讯，时事热点，每日要闻，娱乐头条、财经报道，奇闻趣事，国际新闻，国内新闻，新闻直播，视频直播，新闻客户端，主流媒体，融媒体，新媒体，自媒体，广东触电传媒科技',
                metaDescription: currChannel.describe || '广东触电传媒科技！广电媒体深度融合，打造新型主流媒体。为用户提供时事热点、每日要闻、娱乐头条、体育财经、汽车科技等热点新闻；解决专业媒体、准专业媒体及图文、视频、直播自媒体的内容发布需求。'
            }));
        }        
    } catch (err) {
        yield put(ActionTypes.getChannel.failure(args, err));
    }
}

export default function* globalSaga(args) {
    const { pathName } = args;

    if (pathName.indexOf('/news/') >= 0) {
        const [, channelId] = pathName.split('/news/');
        args.channelId = channelId;
    }    
    yield fork(getChannelFlow, args);
}
