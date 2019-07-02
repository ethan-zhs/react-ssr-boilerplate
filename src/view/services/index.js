import { callApi } from './callApi';
import apiBaseName from './baseName';

// 触电用户登录
export const login = (data) => callApi(apiBaseName.user + '/v4/login', 'POST', data);

// 第三方登录
export const thirdPartLogin = (data) => callApi(apiBaseName.user + '/v2/thirdPartyAccount/signin', 'POST', data);

// 获得频道列表
export const getChannel = () => callApi(apiBaseName.news + '/v5/channel', 'GET');

// 获得新闻详情
export const getNewsContent = (data) => callApi(apiBaseName.news + '/v12/newscontent', 'GET', data);

// 获得友情链接列表
export const getFriendLinks = (data) => callApi(apiBaseName.user + '/v1/friendLink', 'GET', data);

// 获得首页banner列表
export const getIndexBanner = () => callApi(apiBaseName.news + '/v1/homeShow', 'GET');

// 获得热门内容列表
export const getIndexHots = (data) => callApi(apiBaseName.news + '/v9/hottestNews', 'GET', data);

// 获得最新资讯内容列表
export const getIndexLatest = (data) => callApi(apiBaseName.news + '/v9/latestNews', 'GET', data);

// 获得首页文章推荐列表
export const getIndexPush = (data) => callApi(apiBaseName.news + '/v9/recommendNews', 'GET', data);

// 获得频道文章推荐列表
export const getChannelNews = (data) => callApi(apiBaseName.news + '/v9/channelNews', 'GET', data);

// 新闻点赞
export const newsLike = (data) => callApi(apiBaseName.news + '/v9/newslike/' + data.sid, 'PUT');

// 获得新闻评论
export const getNewsComment = (data) => callApi(apiBaseName.news + '/v5/comment', 'GET', data);

// 发表新闻评论
export const addNewsComment = (data) => callApi(apiBaseName.news + '/v5/comment', 'POST', data);

// 获得热点新闻内容
export const getHotNews = (data) => callApi(apiBaseName.news + '/v9/hotNews', 'GET', data);

// 获得媒体详情内容
export const getMediaDetail = (data) => callApi(apiBaseName.news + '/v2/weMediaDetail', 'GET', data);

// 搜索新闻内容
export const search = (data) => callApi(apiBaseName.spm + '/v6/search', 'POST', data);

// 投票
export const vote = (data) => callApi(apiBaseName.news + '/v3/vote', 'POST', data);
