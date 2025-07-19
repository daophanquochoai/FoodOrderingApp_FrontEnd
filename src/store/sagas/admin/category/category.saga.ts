import { categoryApi } from '@/api/client/category/category.api';
import { collectionApi } from '@/api/client/collection/collection.api';
import { fetchCategoryFirst } from '@/store/action/admin/category/category.action';
import { category, common } from '@/store/reducer';
import { selectFilter } from '@/store/selector/admin/category/category.selector';
import { takeLeading } from 'redux-saga/effects';
import { all, call, fork, put, select } from 'typed-redux-saga';

// hanlde fetch first
function* handleFetchFirst() {
    yield put(common.actions.setLoading(true));

    try {
        const { fitler } = yield all({
            fitler: select(selectFilter),
        });

        console.log(fitler);
        const { data } = yield call(collectionApi.getCategoryByFilter, fitler);

        yield put(category.actions.setCategory(data?.data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(common.actions.setLoading(false));
    }
}

// watch fetch first category
function* watchFetchFirst() {
    yield takeLeading(fetchCategoryFirst, handleFetchFirst);
}

// watch all category
export function* watchCategogy() {
    yield* all([fork(watchFetchFirst)]);
}
