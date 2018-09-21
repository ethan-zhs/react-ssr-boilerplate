import { 
    call, 
    put, 
    fork, 
    takeEvery 
} from 'redux-saga/effects';
import * as ActionTypes from './actions';

export function* fetchData(action) {
    console.log(1);
    try {
        const data = yield call((actionData) => {
            console.log('data1111111:', actionData);
            return { res: '1111' };
        }, { a: 1, b: 2 });

        yield put(ActionTypes.add.success(action, data));
    } catch (error) {
        yield put(ActionTypes.add.failure(action, error));
    }
}

function* watchAll() {
    yield* takeEvery(ActionTypes.ADD.REQUEST, fetchData);
}

export default function* firstSaga() {
    yield fork(watchAll);
}
