import { createSelector } from 'reselect';

const firstSelector = (state) => state.get('firstPage');

export default createSelector(firstSelector, (first) => ({    
    list: first.get('list')
}));
