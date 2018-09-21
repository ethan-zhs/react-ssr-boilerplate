import { combineReducers } from 'redux-immutable';
import firstPage from '../FirstPage/reducers';
import secondPage from '../SecondPage/reducers';
import homePage from '../HomePage/reducers';

export default combineReducers({
    firstPage,
    secondPage,
    homePage
});
