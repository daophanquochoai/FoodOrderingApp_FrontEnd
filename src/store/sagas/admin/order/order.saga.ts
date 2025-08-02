import { orderApi } from '@/api/client/order/order.api';
import { fetchFirst } from '@/store/action/admin/order/order.action';
import { order } from '@/store/reducer';
import { selectFilterOrder } from '@/store/selector/admin/order/order.selector';
import { getCookies } from '@/utils/cookies/cookies';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(order.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilterOrder),
        });

        const token = getCookies('access_token');

        const { data } = yield call(orderApi.getOrderByFilter, filter, token);

        yield put(order.actions.setOrder(data?.data?.data));
        yield put(order.actions.setTotalPage(data?.data?.totalPage));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(order.actions.setLoadingPage(false));
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

export function* watchOrder() {
    yield all([fork(watchFetchFirst)]);
}
