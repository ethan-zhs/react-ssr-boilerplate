import { fromJS } from 'immutable';

const initialState = fromJS({
    list: [
        'aa'
    ],
    data: {}
});

const firstPage = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO_FIRST':
            return state.set('list', action.list);
        default:
            return state;
    }
};
  
export default firstPage;
