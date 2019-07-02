import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import * as ActionTypes from './actions';

// import { confuseSid } from '../../constants/common';

/**
 * 轮播新闻
 */
const indexBannerInitState = fromJS({
    isRequest: false,
    success: false,
    isLoad: false,
    list: fromJS([])
});
function indexBanner(state = indexBannerInitState, action) {
    switch (action.type) {
        case ActionTypes.GET_INDEX_BANNER.REQUEST:
            return state
                .set('isRequest', true);
        case ActionTypes.GET_INDEX_BANNER.SUCCESS: {
            return state
                .set('isRequest', false)
                .set('success', true)
                .set('isLoad', true)
                .set('list', fromJS(action.data.result));
        }            
            
        case ActionTypes.GET_INDEX_BANNER.FAILURE:
            return state
                .set('isRequest', false)
                .set('success', false)
                .set('list', []);
        case ActionTypes.LEAVE_PAGE:
            return indexBannerInitState;
        default:
            return state;
    }
}

/**
 * 热点
 */
const indexHotsInitState = fromJS({
    isRequest: false,
    success: false,
    isLoad: false,
    code: 0,
    list: fromJS([])
});
function indexHots(state = indexHotsInitState, action) {
    switch (action.type) {
        case ActionTypes.GET_INDEX_HOTS.REQUEST:
            return state
                .set('isRequest', true);
        case ActionTypes.GET_INDEX_HOTS.SUCCESS: {
            const _res = action.data.result && action.data.result.length ? action.data.result : [];
            
            return state
                .set('isRequest', false)
                .set('success', true)
                .set('list', fromJS(_res));
        }
            
        case ActionTypes.GET_INDEX_HOTS.FAILURE:
            return state
                .set('isRequest', false)
                .set('success', false)
                .set('code', action.data.code)
                .set('message', action.data.message);
        case ActionTypes.LEAVE_PAGE:
            return indexHotsInitState;
        default:
            return state;
    }
}

/**
 * 最新资讯
 */
const indexLatestInitState = fromJS({
    isRequest: false,
    success: false,
    isLoad: false,
    list: fromJS([])
});
function indexLatest(state = indexLatestInitState, action) {
    switch (action.type) {
        case ActionTypes.GET_INDEX_LATEST.REQUEST:
            return state
                .set('isRequest', true);
        case ActionTypes.GET_INDEX_LATEST.SUCCESS: {
            const _res = action.data.result && action.data.result.length ? action.data.result : [];

            return state
                .set('isRequest', false)
                .set('success', true)
                .set('isLoad', true)
                .set('list', fromJS(_res));
        }
            
        case ActionTypes.GET_INDEX_LATEST.FAILURE:
            return state
                .set('isRequest', false)
                .set('success', false)
                .set('list', fromJS([]));
        case ActionTypes.LEAVE_PAGE:
            return indexLatestInitState;
        default:
            return state;
    }
}

/**
 * 首页推送列表
 */
const indexPushInitState = fromJS({
    isRequest: false,
    success: false,
    isLoad: false,
    code: 0,
    list: fromJS([])
});
function indexPush(state = indexPushInitState, action) {
    switch (action.type) {
        case ActionTypes.GET_INDEX_PUSH.REQUEST:
            return state
                .set('isRequest', true);
        case ActionTypes.GET_INDEX_PUSH.SUCCESS: {
            const _res = action.data.newsList;

            return state
                .set('isRequest', false)
                .set('success', true)
                .set('isLoad', true)
                .set('list', fromJS(state.get('list').concat(_res)));
        }            
        
        case ActionTypes.GET_INDEX_PUSH.FAILURE:
            return state
                .set('isRequest', false)
                .set('success', false)
                .set('isload', false)
                .set('code', action.data.code)
                .set('message', action.data.message);
        case ActionTypes.LEAVE_PAGE:
            return indexPushInitState;

        default:
            return state;
    }
}


const friendLinksInitialState = fromJS({
    isPrefetch: false,
    isRequesting: false,
    friendLinks: []
});

const friendLinks = (state = friendLinksInitialState, action) => {    
    switch (action.type) {
        case ActionTypes.GET_FRIEND_LINKS.REQUEST:
            return state.set('isRequesting', true);
        case ActionTypes.GET_FRIEND_LINKS.SUCCESS:
            return state
                .set('friendLinks', fromJS(action.response.friendLinkList || []))
                .set('isRequesting', false);
        case ActionTypes.GET_FRIEND_LINKS.FAILURE:
            return state.set('isRequesting', false);

        case ActionTypes.LEAVE_PAGE:
            return friendLinksInitialState;
        default:
            return state;
    }
};

export default combineReducers({
    indexHots,
    indexLatest,
    indexPush,
    indexBanner,
    friendLinks
});
