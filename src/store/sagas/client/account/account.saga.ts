import { authApi } from '@/api/auth/authApi';
import { addressApi } from '@/api/client/address/address.api';
import { userApi } from '@/api/client/user/user.api';
import {
    actionLogout,
    createAddress,
    fetchAddress,
    fetchFirst,
    updateAccount,
} from '@/store/action/client/account/account.action';
import { account, common } from '@/store/reducer';
import { selectFilterAddress, selectInfo } from '@/store/selector/client/account/account.selector';
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
        const tokenRaw = getCookies('access_token');
        if (json == undefined || tokenRaw == undefined) {
            yield put(common.actions.setErrorMessage('User not found'));
            deleteAllCookies();
            window.location.href = '/login';
        } else {
            const user = JSON.parse(json);
            const token = JSON.parse(tokenRaw);
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
        const tokenRaw = getCookies('access_token');
        const token = JSON.parse(tokenRaw);
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
        const tokenRaw = getCookies('access_token');
        const token = JSON.parse(tokenRaw);

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
        const { info } = yield all({
            info: select(selectInfo),
        });
        const tokenRaw = getCookies('access_token');
        const token = JSON.parse(tokenRaw);
        payload = {
            ...payload,
            userId: {
                id: info?.id,
            },
        };
        console.log(payload);
        const { data } = yield call(addressApi.createAddress, payload, token);
        console.log(data);
        yield handleFetchAddress();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
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

export function* watchAccount() {
    yield all([
        fork(watchFetchFirst),
        fork(watchLogout),
        fork(watchUpdateAccount),
        fork(watchFetchAddress),
        fork(watchCreateAddress),
    ]);
}
