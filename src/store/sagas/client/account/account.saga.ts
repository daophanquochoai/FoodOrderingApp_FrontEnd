import { authApi } from '@/api/auth/authApi';
import { addressApi } from '@/api/client/address/address.api';
import { userApi } from '@/api/client/user/user.api';
import {
    actionLogout,
    createAddress,
    createAddressInProfile,
    fetchAddress,
    fetchFirst,
    setDefaultAddress,
    updateAccount,
    updateAddressInProfile,
} from '@/store/action/client/account/account.action';
import { account, common } from '@/store/reducer';
import { selectFilterAddress, selectInfo } from '@/store/selector/client/account/account.selector';
import { ModalType } from '@/type/store/common';
import { deleteAllCookies, getCookies } from '@/utils/cookies/cookies';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(account.actions.setLoading(true));
    try {
        yield handleFetchInfo();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(account.actions.setLoading(false));
    }
}

export function* handleFetchInfo() {
    try {
        const json = getCookies('user');
        const token = getCookies('access_token');
        if (json == undefined || token == undefined) {
            yield put(common.actions.setErrorMessage('User not found'));
            deleteAllCookies();
            window.location.href = '/login';
        } else {
            const user = JSON.parse(json);
            const { data } = yield call(userApi.getUser, user?.username, token);
            yield put(account.actions.setInfo(data?.data));
        }
    } catch (e) {
        console.error(e);
    }
}

function* handleLogout() {
    try {
        const access_token = getCookies('access_token');
        const refresh_token = getCookies('refresh_token');

        yield call(authApi.logout, {
            accessToken: access_token,
            refreshToken: refresh_token,
        });
        deleteAllCookies();
        window.location.href = '/login';
        yield put(common.actions.setSuccessMessage('Logout Sucessful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    }
}

function* handleUpdateAccount({ payload }) {
    yield put(account.actions.selectLoadingComponent(true));
    try {
        const token = getCookies('access_token');
        yield call(userApi.updateUser, payload, payload?.id, token);

        yield put(common.actions.setSuccessMessage('Update Successful'));
        yield handleFetchInfo();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(account.actions.selectLoadingComponent(false));
    }
}

function* handleFetchAddress() {
    yield put(account.actions.setLoadingAddress(true));
    try {
        const { filter, info } = yield all({
            filter: select(selectFilterAddress),
            info: select(selectInfo),
        });
        const token = getCookies('access_token');

        const { data } = yield call(
            addressApi.getAddress,
            {
                ...filter,
                userId: info?.id,
            },
            token
        );

        yield put(account.actions.setAddress(data?.data?.data));
        yield put(account.actions.setTotalPageAddress(data?.data?.totalPage));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(account.actions.setLoadingAddress(false));
    }
}

function* handleCreateAddress({ payload }) {
    try {
        let info = yield select(selectInfo);
        if (!info) {
            yield call(handleFetchInfo);
            info = yield select(selectInfo);
        }
        const token = getCookies('access_token');
        payload = {
            ...payload,
            userId: {
                id: info?.id,
            },
        };
        yield call(addressApi.createAddress, payload, token);
        yield handleFetchAddress();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    }
}

function* handleCreateAddressInProfile({ payload }) {
    yield put(account.actions.selectLoadingComponent(true));
    try {
        yield* handleCreateAddress({ payload });
        yield put(common.actions.setHiddenModal(ModalType.ADDRESS));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(account.actions.selectLoadingComponent(false));
    }
}

function* handleUpdateAddressInProfile({ payload }) {
    yield put(account.actions.selectLoadingComponent(true));
    try {
        let info = yield select(selectInfo);
        if (!info) {
            yield call(handleFetchInfo);
            info = yield select(selectInfo);
        }
        payload = {
            ...payload,
            userId: {
                id: info?.id,
            },
        };
        const token = getCookies('access_token');
        yield call(addressApi.updateAddress, payload, payload?.id, token);
        yield put(common.actions.setHiddenModal(ModalType.ADDRESS));
        yield handleFetchAddress();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(account.actions.selectLoadingComponent(false));
    }
}

function* handleSetDefault({ payload }) {
    yield put(account.actions.setLoading(true));
    try {
        let info = yield select(selectInfo);
        if (!info) {
            yield call(handleFetchInfo);
            info = yield select(selectInfo);
        }
        const token = getCookies('access_token');
        const { data } = yield call(addressApi.seDefault, payload, info?.id, token);
        yield handleFetchAddress();
        yield put(common.actions.setSuccessMessage('Update successful'));
    } catch (e) {
        console.error(e);
        yield put(account.actions.setLoading(false));
    }
}

function* watchLogout() {
    yield takeEvery(actionLogout, handleLogout);
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

function* watchUpdateAccount() {
    yield takeEvery(updateAccount, handleUpdateAccount);
}

function* watchFetchAddress() {
    yield takeEvery(fetchAddress, handleFetchAddress);
}

function* watchCreateAddress() {
    yield takeEvery(createAddress, handleCreateAddress);
}

function* watchCreateAddressInProfile() {
    yield takeEvery(createAddressInProfile, handleCreateAddressInProfile);
}

function* watchUpdateAddressInProfile() {
    yield takeEvery(updateAddressInProfile, handleUpdateAddressInProfile);
}

function* watchSetDefaultAddress() {
    yield takeEvery(setDefaultAddress, handleSetDefault);
}

export function* watchAccount() {
    yield all([
        fork(watchFetchFirst),
        fork(watchLogout),
        fork(watchUpdateAccount),
        fork(watchFetchAddress),
        fork(watchCreateAddress),
        fork(watchCreateAddressInProfile),
        fork(watchUpdateAddressInProfile),
        fork(watchSetDefaultAddress),
    ]);
}
