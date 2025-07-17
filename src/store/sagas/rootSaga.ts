import { fork } from 'typed-redux-saga';
import watchAuth from './auth/authSaga';
import { watchCollection } from './client/collection/collection.saga';

export default function* rootSaga() {
    yield* fork(watchAuth);
    yield* fork(watchCollection)

}
