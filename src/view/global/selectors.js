import { createSelector } from 'reselect';

const globalSelector = (state) => state.get('global');

export default createSelector(globalSelector, (global) => ({    
    user: global.get('user'),
    channel: global.get('channel').toJS(),
    isPrefetch: global.get('prefetch').get('isPrefetch')
}));
