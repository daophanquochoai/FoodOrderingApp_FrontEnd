import { paymentApi } from '@/api/client/payment/payment.api';
import { fetchFirst } from '@/store/action/client/payment/payment.action';
import { payment } from '@/store/reducer';
import { selectPayment } from '@/store/selector/client/payment/payment.selector';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(payment.actions.setLoadingPayment(true));
    try {
        const { paymentData } = yield all({
            paymentData: select(selectPayment),
        });
        const { data } = yield call(paymentApi.getPayment, paymentData.filter);

        yield put(payment.actions.setPayment(data?.data?.data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(payment.actions.setLoadingPayment(false));
    }
}

// watch fetch first
function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

export function* watchPayment() {
    yield all([fork(watchFetchFirst)]);
}
