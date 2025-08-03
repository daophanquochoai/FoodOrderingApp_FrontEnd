import { orderApi } from '@/api/client/order/order.api';
import {
    changeTab,
    fetchFirst,
    updateOrder,
} from '@/store/action/client/order_profile/order_profile.action';
import { common, order_profile } from '@/store/reducer';
import { selectInfo } from '@/store/selector/client/account/account.selector';
import { selectFilter } from '@/store/selector/client/order_profile/order_profile.selector';
import { getCookies } from '@/utils/cookies/cookies';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';
import { handleFetchInfo } from '../account/account.saga';

function* handleFectcFirst() {
    yield put(order_profile.actions.setLoading(true));
    try {
        yield handleFetchOrder();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(order_profile.actions.setLoading(false));
    }
}

function* handleFetchOrder() {
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });
        console.log(filter);

        let info = yield select(selectInfo);
        if (!info) {
            yield call(handleFetchInfo);
            info = yield select(selectInfo);
        }

        const token = getCookies('access_token');
        const { data } = yield call(
            orderApi.getOrderByFilter,
            {
                ...filter,
                id: [info?.id],
            },
            token
        );
        yield put(order_profile.actions.setOrder(data?.data?.data));
        yield put(order_profile.actions.setTotalPage(data?.data?.totalPage));
    } catch (e) {
        console.error(e);
    }
}

function* hanldeChangeTab({ payload }) {
    yield put(order_profile.actions.setLoading(true));
    const { filter } = yield all({
        filter: select(selectFilter),
    });
    yield put(
        order_profile.actions.setFlter({
            ...filter,
            statusOrders: payload == 'all' ? null : [payload],
        })
    );
    yield handleFetchOrder();
    yield put(order_profile.actions.setLoading(false));
}

function* handleUpdateOrder({ payload }) {
    yield put(order_profile.actions.setLoading(true));
    try {
        const token = getCookies('access_token');
        yield call(
            orderApi.updateOrder,
            payload,
            {
                message: 'Customer was cancel',
                status: 'CANCEL',
            },
            token
        );
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield handleFetchOrder();
        yield put(order_profile.actions.setLoading(false));
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFectcFirst);
}

function* watchChangeTab() {
    yield takeEvery(changeTab, hanldeChangeTab);
}

function* watchUpdateOrder() {
    yield takeEvery(updateOrder, handleUpdateOrder);
}

export function* watchOrderProfile() {
    yield* all([fork(watchFetchFirst), fork(watchChangeTab), fork(watchUpdateOrder)]);
}
