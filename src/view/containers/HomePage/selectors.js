import { createSelector } from 'reselect';

const homeSelector = (state) => state.get('HomePage');
const globalSelector = (state) => state.get('global');


export default createSelector([homeSelector, globalSelector], (home, global) => ({    
    bannerData: home.get('indexBanner').get('list'),
    friendLinks: home.get('friendLinks').get('friendLinks'),
    indexLatest: home.get('indexLatest'),
    indexHots: home.get('indexHots'),
    indexPush: home.get('indexPush'),
    isPrefetch: global.get('prefetch').get('isPrefetch')
}));
