import { createSelector } from 'reselect';

const secondSelector = (state) => state.get('secondPage');

export default createSelector(secondSelector, (second) => ({    
    list: second.get('list')
}));
