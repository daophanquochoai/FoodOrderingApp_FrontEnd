import { voucherApi } from '@/api/client/voucher/voucher.api';
import { fetchFirst } from '@/store/action/client/voucher/voucher.action';
import { common, voucher } from '@/store/reducer';
import { selectFilter } from '@/store/selector/client/voucher/voucher.selector';
import { all, select, takeEvery } from 'redux-saga/effects';
import { call, fork, put } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(voucher.actions.setLoading(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });
        const { data } = yield call(voucherApi.getVoucherByFilter, filter);
        yield put(voucher.actions.setVoucher(data?.data?.data));
        yield put(voucher?.actions.setTotalPage(data?.data?.totalPage));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(voucher.actions.setLoading(false));
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

export function* watchVoucher() {
    yield all([fork(watchFetchFirst)]);
}
