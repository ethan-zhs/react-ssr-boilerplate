import { fromJS } from 'immutable';

const initialState = fromJS({
    list: [],
    data: {}
});

const homePage = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO_HOME':
            return state.set('list', action.list);
        default:
            return state;
    }
};
  
export default homePage;
