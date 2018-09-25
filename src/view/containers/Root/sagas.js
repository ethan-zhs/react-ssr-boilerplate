import { fork } from 'redux-saga/effects';
import firstSaga from '../FirstPage/sagas';

export default function* rootSagas() {
    yield fork(firstSaga);
}
