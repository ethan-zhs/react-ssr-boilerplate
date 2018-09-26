import { fork } from 'redux-saga/effects';
import firstSaga from '../FirstPage/sagas';
import secondSaga from '../SecondPage/sagas';

export default function* rootSagas() {
    yield fork(firstSaga);
    yield fork(secondSaga);
}
