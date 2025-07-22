import { foodApi } from '@/api/client/collection/food.api';
import { foodSizeApi } from '@/api/client/collection/food_size.api';
import { sizeApi } from '@/api/client/collection/size.api';
import { filterApi } from '@/api/filter/fitler.api';
import {
    addSize,
    createFoodSize,
    fetchFirst,
    fetchFood,
    removeFoodSize,
    updateFood,
} from '@/store/action/admin/food/food_manager.action';
import { common, foodManager } from '@/store/reducer';
import FoodManagerSlice from '@/store/reducer/admin/food/food_manager.reducer';
import {
    selectFilter,
    selectFoodSelected,
} from '@/store/selector/admin/food/food_manager.selector';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(FoodManagerSlice.actions.setLoading(true));
    try {
        yield* handleFetchFood();
        yield* handleFetchSize();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(FoodManagerSlice.actions.setLoading(false));
    }
}

// fetch food
function* handleFetchFood() {
    const { filter } = yield all({
        filter: select(selectFilter),
    });

    const { data } = yield call(foodApi.getFoodByFilter, filter);

    yield put(FoodManagerSlice.actions.setFood(data?.data));
}

// fetch filter size
function* handleFetchSize() {
    try {
        const { data } = yield call(
            filterApi.getFilter,
            {
                options: ['SIZE'],
            },
            'admin'
        );

        yield put(foodManager.actions.setFilterOption(data?.data));
    } catch (e) {
        console.error(e);
    }
}

//add food size
function* handleAddFoodSize({ payload }) {
    yield put(foodManager.actions.setLoadingComponent(true));
    try {
        const { data } = yield call(foodSizeApi.createFoodSize, payload.data);

        const { foodSelected } = yield all({
            foodSelected: select(selectFoodSelected),
        });
        console.log(data);
        yield put(
            foodManager.actions.setFoodSelected({
                ...foodSelected,
                foodSizes: [data?.data, ...foodSelected?.foodSizes],
            })
        );
        yield put(common.actions.setSuccessMessage('Create food size successul'));
        payload.resetYup();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(foodManager.actions.setLoadingComponent(false));
    }
}

// remove food size
function* handleRemoveFoodSize({ payload }) {
    yield put(foodManager.actions.setLoadingComponent(true));
    try {
        yield call(foodSizeApi.updateFoodSize, payload?.data, payload?.id);

        yield put(common.actions.setSuccessMessage('Update successful'));

        const { selectedFood } = yield all({
            selectedFood: select(selectFoodSelected),
        });

        yield put(
            foodManager.actions.setFoodSelected({
                ...selectedFood,
                foodSizes: [...selectedFood?.foodSizes?.filter((item) => item?.id != payload?.id)],
            })
        );
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(foodManager.actions.setLoadingComponent(false));
    }
}

/**
 * update food
 */
function* handleUpdateFood({ payload }) {
    yield put(foodManager.actions.setLoadingComponent(true));
    try {
        yield call(foodApi.updateFoodById, payload?.id, payload.data);

        yield put(common.actions.setSuccessMessage('Update food successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(foodManager.actions.setLoadingComponent(false));
    }
}

/**
 * add size
 */
function* handleAddSize({ payload }) {
    yield put(foodManager.actions.setLoadingComponent(true));
    try {
        const { data } = yield call(sizeApi.addSize, payload);
        yield* handleFetchSize();

        yield* put(common.actions.setSuccessMessage('Create size successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(foodManager.actions.setLoadingComponent(false));
    }
}

// watch fetch first
function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

// watch add size
function* watchAddSize() {
    yield takeEvery(addSize, handleAddSize);
}

//watch remove food size
function* watchRemoveFoodSize() {
    yield* takeEvery(removeFoodSize, handleRemoveFoodSize);
}

//watch fetch food
function* watchFetchFood() {
    yield* takeEvery(fetchFood, handleFetchFood);
}

//watch create food size
function* watchCreateFoodSize() {
    yield* takeEvery(createFoodSize, handleAddFoodSize);
}

//watch update food
function* watchUpdateFood() {
    yield* takeEvery(updateFood, handleUpdateFood);
}

export function* watchFoodManager() {
    yield all([
        fork(watchFetchFood),
        fork(watchAddSize),
        fork(watchRemoveFoodSize),
        fork(watchFetchFirst),
        fork(watchCreateFoodSize),
        fork(watchUpdateFood),
    ]);
}
