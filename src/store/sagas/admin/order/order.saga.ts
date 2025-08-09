import { orderApi } from '@/api/client/order/order.api';
import { fetchFirst, updateOrder } from '@/store/action/admin/order/order.action';
import { common, order } from '@/store/reducer';
import {
    selectFilterOrder,
    selectSelectedOrder,
} from '@/store/selector/admin/order/order.selector';
import { ModalType } from '@/type/store/common';
import { getCookies } from '@/utils/cookies/cookies';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

export function* handleFetchFirst() {
    yield put(order.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilterOrder),
        });

        const token = getCookies('access_token');

        const { data } = yield call(orderApi.getOrderByFilter, filter, token);

        console.log(data);
        yield put(order.actions.setOrder(data?.data?.data));
        yield put(order.actions.setTotalPage(data?.data?.totalPage));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(order.actions.setLoadingPage(false));
    }
}

function* handleUpdateOrder({ payload }) {
    yield put(order.actions.setLoadingComponent(true));
    try {
        const { selectedOrder } = yield all({
            selectedOrder: select(selectSelectedOrder),
        });
        const token = getCookies('access_token');
        yield call(orderApi.updateOrder, selectedOrder?.id, payload, token);
        yield put(common.actions.setHiddenModal(ModalType.ORDER_SHIPPER));
        yield handleFetchFirst();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(order.actions.setLoadingComponent(false));
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

function* watchUpdateOrder() {
    yield takeEvery(updateOrder, handleUpdateOrder);
}

export function* watchOrder() {
    yield all([fork(watchFetchFirst), fork(watchUpdateOrder)]);
}
