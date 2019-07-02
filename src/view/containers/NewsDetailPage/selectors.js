import { createSelector } from 'reselect';

const newsSelector = (state) => state.get('NewsDetailPage');
const globalSelector = (state) => state.get('global');

export default createSelector([newsSelector, globalSelector], (news, global) => ({  
    newsContent: news.get('newsContent').toJS(),
    hotNewsList: news.get('hotNewsList').toJS(),
    isPrefetch: global.get('prefetch').get('isPrefetch')
}));
