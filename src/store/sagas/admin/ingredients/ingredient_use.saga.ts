import { ingredientsUseApi } from '@/api/admin/ingredients/ingredients_use.api';
import { orderApi } from '@/api/client/order/order.api';
import { fetchFirst, updateOrder } from '@/store/action/admin/ingredients/ingredient_use.action';
import { common, ingredient_use } from '@/store/reducer';
import { selectSelectedOrder } from '@/store/selector/admin/order/order.selector';
import { ModalType } from '@/type/store/common';
import { getCookies } from '@/utils/cookies/cookies';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';
import { handleFetchFirst } from '../order/order.saga';

function* handleFetchFirstIngre({ payload }) {
    yield put(ingredient_use.actions.setLoading(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(ingredientsUseApi.getIngredientUseByOrderId, payload, token);
        console.log(data);
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(ingredient_use.actions.setLoading(false));
    }
}

function* handleUpdateOrder({ payload }) {
    yield put(ingredient_use.actions.setLoadingComponent(true));
    console.log(payload);
    try {
        const { selectedOrder } = yield all({
            selectedOrder: select(selectSelectedOrder),
        });
        const token = getCookies('access_token');
        yield call(orderApi.updateOrder, selectedOrder?.id, payload, token);
        yield handleFetchFirst();
        yield put(common.actions.setHiddenModal(ModalType.ORDER_CHEF));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(ingredient_use.actions.setLoadingComponent(false));
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirstIngre);
}
function* watchUpdateOrder() {
    yield takeEvery(updateOrder, handleUpdateOrder);
}

export function* watchIngredientUse() {
    yield all([fork(watchFetchFirst), fork(watchUpdateOrder)]);
}
