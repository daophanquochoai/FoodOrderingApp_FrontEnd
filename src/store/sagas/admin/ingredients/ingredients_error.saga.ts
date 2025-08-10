import { ingredientsErrorApi } from '@/api/client/ingredients/ingredients_error.api';
import {
    addIngredientsError,
    changePage,
    fetchFirst,
    updateIngredientsError,
    fetchHistoryIngredients,
} from '@/store/action/admin/ingredients/ingredients_error.action';
import { common, ingredientsError } from '@/store/reducer';
import { selectFilter } from '@/store/selector/admin/ingredients/ingredients_error.selector';
import { ModalType } from '@/type/store/common';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';
import { getCookies } from '@/utils/cookies/cookies';

function* handleFetchFirst() {
    yield put(ingredientsError.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });
        const token = getCookies('access_token');
        const { data } = yield call(ingredientsErrorApi.getIngredientsError, filter, token);
        yield put(ingredientsError.actions.setTotalPage(data?.data?.totalPage));
        yield put(ingredientsError.actions.setIngredientsError(data?.data?.data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(ingredientsError.actions.setLoadingPage(false));
    }
}

function* handleFetchHistoryIngredients({ payload }) {
    yield put(ingredientsError.actions.setLoadingHistory(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(
            ingredientsErrorApi.getHistoryIngredientsByHistoryId,
            payload.id,
            token
        );
        yield put(ingredientsError.actions.setHistoryIngredients(data?.data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(ingredientsError.actions.setLoadingHistory(false));
    }
}

function* handleAddIngredientsError({ payload }) {
    yield put(ingredientsError.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');
        yield call(ingredientsErrorApi.addIngredientsError, payload, token);
        yield put(common.actions.setSuccessMessage('Thêm nguyên liệu lỗi thành công'));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(ingredientsError.actions.setLoadingComponent(false));
    }
    yield put(common.actions.setHiddenModal(ModalType.SPOIL_INGREDIENT));
    yield handleFetchFirst();
}

function* handleUpdateIngredientsError({ payload }) {
    yield put(ingredientsError.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');
        yield call(ingredientsErrorApi.updateIngredientsError, payload.data, payload?.id, token);
    } catch (e) {
        console.error(e);
    } finally {
        yield put(ingredientsError.actions.setLoadingComponent(false));
    }
    yield put(common.actions.setHiddenModal(ModalType.SPOIL_INGREDIENT));
    yield handleFetchFirst();
}

function* handleChangePage({ payload }) {
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });
        yield put(
            ingredientsError.actions.setFilter({
                ...filter,
                pageNo: payload,
            })
        );
        yield handleFetchFirst();
    } catch (e) {
        console.error(e);
    }
}
    
function* watchFetchFirst() {
    yield* takeEvery(fetchFirst, handleFetchFirst);
}

function* watchFetchHistoryIngredients() {
    yield* takeEvery(fetchHistoryIngredients, handleFetchHistoryIngredients);
}

function* watchAddIngredientsError() {
    yield* takeEvery(addIngredientsError, handleAddIngredientsError);
}

function* watchUpdateIngredientsError() {
    yield* takeEvery(updateIngredientsError, handleUpdateIngredientsError);
}

function* watchChangePage() {
    yield* takeEvery(changePage, handleChangePage);
}

export function* watchIngredientsError() {
    yield all([
        fork(watchFetchFirst),
        fork(watchFetchHistoryIngredients),
        fork(watchAddIngredientsError),
        fork(watchUpdateIngredientsError),
        fork(watchChangePage),
    ]);
}