import { 
    call, put, fork, takeEvery, takeLatest 
} from 'redux-saga/effects';
import * as ActionTypes from './actions';


function* add(action) {
    try {
        const data = yield call((actionData) => {
            console.log('page second add:', actionData);
            return { res: '1111' };
        }, { a: 1, b: 2 });

        yield put(ActionTypes.add.success(action, data));
    } catch (error) {
        yield put(ActionTypes.add.failure(action, error));
    }
}

function* cut(action) {
    try {
        const data = yield call((actionData) => {
            console.log('page second cut:', actionData);
            return { res: '2222' };
        }, { a: 1, b: 2 });

        yield put(ActionTypes.cut.success(action, data));
    } catch (error) {
        yield put(ActionTypes.cut.failure(action, error));
    }
}

function* watchAll() {
    yield takeLatest(ActionTypes.ADD.REQUEST, add);
    yield takeLatest(ActionTypes.CUT.REQUEST, cut);
}

export default function* secondSaga() {
    yield fork(watchAll);
}
