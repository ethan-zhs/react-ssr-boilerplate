import { combineReducers } from 'redux-immutable';
import { fromJS, toJS } from 'immutable';

import * as actionTypes from './actions';

const initialChannelState = fromJS({
    isRequest: false,
    success: false,
    list: fromJS({})
});

const channel = (state = initialChannelState, action) => {
    switch (action.type) {
        case actionTypes.GET_CHANNEL.REQUEST:
            return state.set('isRequest', true);
        case actionTypes.GET_CHANNEL.SUCCESS: {            
            return state
                .set('isRequest', false)
                .set('list', fromJS(action.response));
        }          
        case actionTypes.GET_CHANNEL.FAILURE:
            return state.set('isRequest', false)
                .set('list', fromJS({}));

        default:
            return state;
    }
};


const initialUserState = fromJS({
    isRequest: false,
    success: false,
    userinfo: {}
});

const user = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN.REQUEST:
            return state
                .set('isRequest', true)
                .set('success', false);
        case actionTypes.LOGIN.SUCCESS: 
            return state
                .set('userinfo', action.response)
                .set('isRequest', false);       
        case actionTypes.LOGIN.FAILURE:
            return state
                .set('userinfo', action.error)
                .set('isRequest', false);

        
        case actionTypes.THIRD_PART_LOGIN.REQUEST:
            return state.set('isRequest', true);
        case actionTypes.THIRD_PART_LOGIN.SUCCESS: 
            return state
                .set('userinfo', action.response)    
                .set('isRequest', false);       
        case actionTypes.THIRD_PART_LOGIN.FAILURE:
            return state
                .set('userinfo', action.error)
                .set('isRequest', false);

        default:
            return state;
    }
};


const initialPrefetchState = fromJS({
    isPrefetch: false,
    use: false,
    title: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: ''
});

const prefetch = (state = initialPrefetchState, action) => {
    switch (action.type) {
        case actionTypes.PREFETCH_SET:
            return state.set('isPrefetch', true);

        case actionTypes.SEO_SET:
            return state
                .set('use', true)
                .set('title', action.title)
                .set('metaTitle', action.metaTitle)
                .set('metaKeywords', action.metaKeywords)
                .set('metaDescription', action.metaDescription);

        default:
            return state;
    }
};

export default combineReducers({
    channel,
    user,
    prefetch
});
