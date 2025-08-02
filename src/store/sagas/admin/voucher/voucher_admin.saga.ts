import { voucherApi } from '@/api/client/voucher/voucher.api';
import { filterApi } from '@/api/filter/fitler.api';
import {
    createVoucher,
    exportVoucher,
    fetchFirst,
    updateVoucher,
} from '@/store/action/admin/voucher/voucher_admin.action';
import { common, voucher_admin } from '@/store/reducer';
import {
    selectFilterVoucher,
    selectVoucherSelected,
} from '@/store/selector/admin/voucher/voucher_admin.selector';
import { ModalType } from '@/type/store/common';
import { getCookies } from '@/utils/cookies/cookies';
import dayjs from 'dayjs';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(voucher_admin.actions.setLoadingPage(true));
    try {
        yield handleFetchVoucher();
        yield handleFetchFilterOption();
    } catch (e) {
    } finally {
        yield put(voucher_admin.actions.setLoadingPage(false));
    }
}

function* handleFetchFilterOption() {
    try {
        const { data } = yield call(
            filterApi.getFilter,
            {
                options: ['CATEGORY', 'FOOD', 'VOUCHER'],
            },
            'admin'
        );
        yield put(voucher_admin.actions.setFilterOption(data?.data));
    } catch (e) {
        console.error(e);
    }
}

function* handleFetchVoucher() {
    try {
        const { filter } = yield all({
            filter: select(selectFilterVoucher),
        });
        const token = getCookies('access_token');
        const { data } = yield call(voucherApi.getVoucherByFilter, filter, token);
        yield put(voucher_admin.actions.setVoucher(data?.data?.data));
        yield put(voucher_admin.actions.setTotalVoucher(data?.data?.totalPage));
    } catch (e) {
        console.error(e);
    }
}

function* handleUpdateVoucher({ payload }) {
    yield put(voucher_admin.actions.setLoadingComponent(true));
    try {
        const { selectVoucher } = yield all({
            selectVoucher: select(selectVoucherSelected),
        });
        const dataPayload = {
            ...selectVoucher,
            code: payload?.code,
            desc: payload?.description,
            discountType: payload?.discountType,
            discountValue: payload?.discountValue,
            maxDiscount: payload?.maxDiscount,
            maxUse: payload?.maxUse,
            startDate: dayjs(payload?.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(payload?.endDate).format('YYYY-MM-DD'),
            status: payload?.status,
        };

        const token = getCookies('access_token');
        yield call(voucherApi.updateVoucher, dataPayload, selectVoucher?.id, token);
        yield put(common.actions.setSuccessMessage('Update voucher successful'));
        yield handleFetchVoucher();
        yield put(common.actions.setHiddenModal(ModalType.VOUCHER));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(voucher_admin.actions.setLoadingComponent(false));
    }
}

function* handleCreateVoucher({ payload }) {
    yield put(voucher_admin.actions.setLoadingComponent(true));
    try {
        const { selectVoucher } = yield all({
            selectVoucher: select(selectVoucherSelected),
        });
        const dataPayload = {
            ...selectVoucher,
            code: payload?.code,
            desc: payload?.description,
            discountType: payload?.discountType,
            discountValue: payload?.discountValue,
            maxDiscount: payload?.maxDiscount,
            maxUse: payload?.maxUse,
            startDate: dayjs(payload?.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(payload?.endDate).format('YYYY-MM-DD'),
            status: 'DELETE',
            id: 0,
        };

        const token = getCookies('access_token');
        yield call(voucherApi.createVoucher, dataPayload, token);
        yield put(common.actions.setSuccessMessage('Create voucher successful'));
        yield handleFetchVoucher();
        yield put(common.actions.setHiddenModal(ModalType.VOUCHER));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(voucher_admin.actions.setLoadingComponent(false));
    }
}

function* handleExportVoucher({ payload }) {
    yield put(voucher_admin.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(voucherApi.exportVoucher, payload, token);
        console.log(data);
        yield put(common.actions.setSuccessMessage('Export successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(voucher_admin.actions.setLoadingComponent(false));
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

function* watchUpdateVOucher() {
    yield takeEvery(updateVoucher, handleUpdateVoucher);
}

function* watchCreateVoucher() {
    yield takeEvery(createVoucher, handleCreateVoucher);
}

function* watchExportVoucher() {
    yield takeEvery(exportVoucher, handleExportVoucher);
}

export function* watchVoucherAdmin() {
    yield all([
        fork(watchFetchFirst),
        fork(watchUpdateVOucher),
        fork(watchCreateVoucher),
        fork(watchExportVoucher),
    ]);
}
