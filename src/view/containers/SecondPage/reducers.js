import { fromJS } from 'immutable';

const initialState = fromJS({
    list: [],
    data: {}
});

const secondPage = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO_SECOND':
            return state.set('list', action.list);
        default:
            return state;
    }
};
  
export default secondPage;
