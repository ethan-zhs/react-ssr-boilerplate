import { fromJS } from 'immutable';
import * as ActionTypes from './actions';

const initialState = fromJS({
    isRequesting: false,
    newsContent: {},
    hotNewsList: []
});

const NewsDetailPage = (state = initialState, action) => {    
    switch (action.type) {
        case ActionTypes.GET_NEWS_CONTENT.REQUEST:
            return state.set('isRequesting', true);
        case ActionTypes.GET_NEWS_CONTENT.SUCCESS:
            return state
                .set('newsContent', fromJS(action.response))
                .set('isRequesting', false);
        case ActionTypes.GET_NEWS_CONTENT.FAILURE:
            return state.set('isRequesting', false);

        
        case ActionTypes.GET_HOT_NEWS.REQUEST:
            return state.set('isRequesting', true);
        case ActionTypes.GET_HOT_NEWS.SUCCESS:
            return state
                .set('hotNewsList', fromJS(action.response.newsList) || [])
                .set('isRequesting', false);
        case ActionTypes.GET_HOT_NEWS.FAILURE:
            return state.set('isRequesting', false);


        case ActionTypes.PAGE_CLEAR:
            return state.set('list', action.list);
            
        default:
            return state;
    }
};
  
export default NewsDetailPage;
