import { filterHistoryApi } from '@/api/admin/history/filter_history.api';
import { historyApi } from '@/api/admin/history/history.api';
import {
    addHistoryImport,
    deleteHistoryImport,
    fetchFirst,
} from '@/store/action/admin/history/history.action';
import { common, history_import } from '@/store/reducer';
import { selectFilter } from '@/store/selector/admin/history/history.selector';
import { ModalType } from '@/type/store/common';
import { getCookies } from '@/utils/cookies/cookies';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(history_import.actions.setLoadingPage(true));
    try {
        yield handleFetchHistory();

        yield handleFetcFilter();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(history_import.actions.setLoadingPage(false));
    }
}

function* handleFetchHistory() {
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const token = getCookies('access_token');
        const { data } = yield call(historyApi.getHistoryIngredientByFilter, filter, token);

        yield put(history_import.actions.setHistory(data?.data?.data));
        yield put(history_import.actions.setTotalPage(data?.data?.totalPage));
    } catch (e) {
        console.error(e);
    }
}

function* handleFetcFilter() {
    try {
        const token = getCookies('access_token');
        const { data } = yield call(
            filterHistoryApi.getFilter,
            { filters: ['SOURCE', 'INGREDIENTS'] },
            token
        );
        yield put(history_import.actions.setFilterOption(data?.data));
    } catch (e) {
        console.error(e);
    }
}

function* handleDeleteHistory({ payload }) {
    yield put(history_import.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');

        yield call(historyApi.updateHistory, payload, token);
        yield put(common.actions.setSuccessMessage('Update successfuly'));
        yield put(common.actions.showModal(ModalType.IMPORT_MANAGEMENT));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(history_import.actions.setLoadingComponent(false));
    }
}

function* handleAddHistoryImport({ payload }) {
    yield put(history_import.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');
        yield call(historyApi.addHistory, payload, token);
        yield put(common.actions.setSuccessMessage('Create successful'));
        yield put(common.actions.setHiddenModal(ModalType.IMPORT_MANAGEMENT));
        yield handleFetchHistory();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(history_import.actions.setLoadingComponent(false));
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

function* watchDeleteHistory() {
    yield takeEvery(deleteHistoryImport, handleDeleteHistory);
}

function* watchAddHistoryImport() {
    yield takeEvery(addHistoryImport, handleAddHistoryImport);
}

export function* watchHistory() {
    yield all([fork(watchFetchFirst), fork(watchDeleteHistory), fork(watchAddHistoryImport)]);
}
