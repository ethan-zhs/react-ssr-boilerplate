import { fromJS } from 'immutable';
import * as ActionTypes from './actions';

const initialState = fromJS({
    isRequesting: false,
    list: [
        'aa'
    ],
    data: {}
});

const secondPage = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD.REQUEST:
            return state.set('isRequesting', true);
        case ActionTypes.ADD.SUCCESS:
            return state
                .set('list', action.list)
                .set('isRequesting', false);
        case ActionTypes.ADD.FAILURE:
            return state.set('isRequesting', false);


        case ActionTypes.CUT.REQUEST:
            return state.set('isRequesting', true);
        case ActionTypes.CUT.SUCCESS:
            return state
                .set('list', action.list)
                .set('isRequesting', false);
        case ActionTypes.CUT.FAILURE:
            return state.set('isRequesting', false);


        case ActionTypes.PAGE_CLEAR:
            return state.set('list', action.list);
        default:
            return state;
    }
};
  
export default secondPage;
