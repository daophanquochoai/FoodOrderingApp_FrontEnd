import { sourceApi } from '@/api/client/source/source.api';
import LoadingPage from '@/pages/LoadingPage';
import { createSource, updateSource } from '@/store/action/admin/source/source.action';
import { fetchFirst } from '@/store/action/common/common.action';
import { common, sources } from '@/store/reducer';
import { selectFilter } from '@/store/selector/admin/source/source.selector';
import { ModalType } from '@/type/store/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(sources.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data } = yield call(sourceApi.getSourceByFilter, filter);

        yield put(
            sources.actions.setSource({
                loadingPage: false,
                data: data?.data?.data,
                totalPage: data?.data?.totalPage,
            })
        );
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(sources.actions.setLoadingPage(false));
    }
}

function* handleCreateSource({ payload }: PayloadAction<any>) {
    yield put(sources.actions.selectLoadingComponent(true));
    try {
        const { data } = yield call(sourceApi.addSource, payload);
        yield put(common.actions.setSuccessMessage('Create Source Successful'));
        yield put(common.actions.setHiddenModal(ModalType.SOURCE_MANAGEMENT));
        yield handleFetchFirst();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(sources.actions.selectLoadingComponent(false));
    }
}

function* hanldeUpdateSource({ payload }: PayloadAction<any>) {
    yield put(sources.actions.selectLoadingComponent(true));
    try {
        yield call(sourceApi.updateSource, payload, payload?.id);
        yield put(common.actions.setSuccessMessage('Update Source Successful'));
        yield put(common.actions.setHiddenModal(ModalType.SOURCE_MANAGEMENT));
        yield handleFetchFirst();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(sources.actions.selectLoadingComponent(false));
    }
}

// watch update source
function* watchUpdateSource() {
    yield takeEvery(updateSource, hanldeUpdateSource);
}

//watch fetch first
function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

//watch  add source
function* watchAddSource() {
    yield takeEvery(createSource, handleCreateSource);
}
export function* watchSource() {
    yield all([fork(watchFetchFirst), fork(watchAddSource), fork(watchUpdateSource)]);
}
