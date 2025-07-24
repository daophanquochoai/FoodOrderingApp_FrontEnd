import { ingredientApi } from '@/api/client/ingredients/ingredients.api';
import {
    addIngredient,
    changePage,
    fetchFirst,
    fetchHistory,
    updateIngredient,
} from '@/store/action/admin/ingredients/ingredient.action';
import { common, ingredients } from '@/store/reducer';
import {
    selectFilter,
    selectFilterHistoryIngredient,
    selectIngredientsSelected,
} from '@/store/selector/admin/ingredients/ingredients.selector';
import { ModalType } from '@/type/store/common';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(ingredients.actions.setLoading(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data } = yield call(ingredientApi.getIngredients, filter);
        console.log(data);
        yield put(ingredients.actions.setTotalPage(data?.data?.totalPage));
        yield put(ingredients.actions.setIngredient(data?.data?.data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(ingredients.actions.setLoading(false));
    }
}

function* handleFetchHistory() {
    yield put(ingredients.actions.setLoadingHistory(true));
    try {
        const { selectedIngredient, filterHistoryIngredients } = yield all({
            selectedIngredient: select(selectIngredientsSelected),
            filterHistoryIngredients: select(selectFilterHistoryIngredient),
        });

        const { data } = yield call(
            ingredientApi.getHistoryIngredients,
            filterHistoryIngredients,
            selectedIngredient?.id
        );
        yield put(
            ingredients.actions.setHistory({
                history: data?.data?.data,
                totalPage: data?.data?.totalPage,
            })
        );
    } catch (e) {
        console.error(e);
    } finally {
        yield put(ingredients.actions.setLoadingHistory(false));
    }
}

function* handleAddIngredient({ payload }) {
    yield put(ingredients.actions.setLoadingComponent(true));
    try {
        yield call(ingredientApi.createIngredient, payload);
        yield put(common.actions.setSuccessMessage('Create Ingredient Successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(ingredients.actions.setLoadingComponent(false));
    }
    yield put(common.actions.setHiddenModal(ModalType.INGREDIENT));
    yield handleFetchFirst();
}

function* handleChangePage({ payload }) {
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });
        yield put(
            ingredients.actions.setFilter({
                ...filter,
                pageNo: payload,
            })
        );
        yield handleFetchFirst();
    } catch (e) {
        console.error(e);
    }
}

function* handleUpdateIngredient({ payload }) {
    yield put(ingredients.actions.setLoadingComponent(true));
    try {
        yield call(ingredientApi.updateIngredient, payload.data, payload?.id);
        yield put(common.actions.setSuccessMessage(`${payload.type} Ingredient Successful`));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(ingredients.actions.setLoadingComponent(false));
    }
    yield put(common.actions.setHiddenModal(ModalType.INGREDIENT));
    yield handleFetchFirst();
}

// watch fetch history
function* watchFetchHistory() {
    yield* takeEvery(fetchHistory, handleFetchHistory);
}

//watch fetch first
function* watchFetchFirst() {
    yield* takeEvery(fetchFirst, handleFetchFirst);
}

// watch add ingredients
function* watchAddIngredients() {
    yield* takeEvery(addIngredient, handleAddIngredient);
}

// watch change page
function* watchChangePageIngredient() {
    yield* takeEvery(changePage, handleChangePage);
}

// watch delete ingredient
function* watchDeleteIngredient() {
    yield* takeEvery(updateIngredient, handleUpdateIngredient);
}

// watch ingredients
export function* watchIngredients() {
    yield all([
        fork(watchFetchFirst),
        fork(watchFetchHistory),
        fork(watchAddIngredients),
        fork(watchChangePageIngredient),
        fork(watchDeleteIngredient),
    ]);
}
