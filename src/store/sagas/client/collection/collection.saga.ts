import { collectionApi } from '@/api/client/collection/collection.api';
import { foodApi } from '@/api/client/collection/food.api';
import { sizeApi } from '@/api/client/collection/size.api';
import { firstFetch } from '@/store/action/client/collection/collection.action';
import { collection, food } from '@/store/reducer';
import commonSlice from '@/store/reducer/common/common.reducer';
import { selectFilterCategory } from '@/store/selector/client/collection/collection.selector';
import { selectFilter } from '@/store/selector/client/collection/food.selector';
import { takeLeading } from 'redux-saga/effects';
import { all, call, fork, put, select } from 'typed-redux-saga';

function* handleFirstFetch() {
    try {
        yield put(commonSlice.actions.setLoading(true));

        //get category
        yield handleFetchCategory();
        //get food
        yield* handleFetchFood();
        // get filter
        yield handleFetchSizeFilter();
    } catch (e) {
        yield put(commonSlice.actions.setErrorMessage(e));
    } finally {
        yield put(commonSlice.actions.setLoading(false));
    }
}

/**
 * get category
 */
function* handleFetchCategory() {
    const { filterCategory } = yield all({
        filterCategory: select(selectFilterCategory),
    });
    //get category by api
    const responseCategory = yield* call(collectionApi.getCategoryByFilter, filterCategory);
    //save
    yield put(collection.actions.setCategory(responseCategory?.data?.data));
}

/**
 * get food
 */
function* handleFetchFood() {
    try {
        const { filterFood } = yield all({
            filterFood: select(selectFilter),
        });

        //get food by api
        const responseFood = yield* call(foodApi.getFoodByFilter, filterFood);
        yield put(food.actions.setFood(responseFood?.data?.data));
    } catch (e) {
        console.error(e);
    }
}

/**
 * getr size filter
 */
function* handleFetchSizeFilter() {
    try {
        const { data } = yield* call(sizeApi.getSizeForFilter, {
            pageNo: 0,
            pageSize: 1000,
            search: '',
            sort: 'asc',
            order: 'id',
            deep: 1,
        });

        yield put(food.actions.setSize(data?.data?.data));
    } catch (e) {
        console.error(e);
    }
}

/**
 * watch first fetch
 */
function* watchFirstFetch() {
    yield takeLeading(firstFetch, handleFirstFetch);
}

export function* watchCollection() {
    yield* all([fork(watchFirstFetch)]);
}
