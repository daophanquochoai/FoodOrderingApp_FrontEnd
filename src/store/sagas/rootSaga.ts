import { fork } from 'typed-redux-saga';
import watchAuth from './auth/authSaga';

export default function* rootSaga() {
    yield* fork(watchAuth);
}
