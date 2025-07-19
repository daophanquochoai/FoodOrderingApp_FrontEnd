import { fork } from 'typed-redux-saga';
import watchAuth from './auth/authSaga';
import { watchCollection } from './client/collection/collection.saga';
import { watchCategogy } from './admin/category/category.saga';

export default function* rootSaga() {
    yield* fork(watchAuth);
    yield* fork(watchCollection);
    yield* fork(watchCategogy);
}
