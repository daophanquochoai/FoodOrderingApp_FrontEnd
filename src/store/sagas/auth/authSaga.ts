import { all, call, fork, put, takeLatest } from 'typed-redux-saga';
import { createUserAction, loginAction } from '../../action/auth/auth.action';
import { authApi } from '@/api/auth/authApi';
import { auth, common } from '@/store/reducer';
import { userApi } from '@/api/client/user/user.api';
import { setCookies } from '@/utils/cookies/cookies';

function* handleLogin({ payload }) {
    const { username, password } = payload;

    try {
        yield* put(auth.actions.setLoading(true));

        const { data } = yield* call(authApi.login, { username, password });
        const user: any = data.data;
        yield* put(
            auth.actions.setAccount({
                user,
                token: data.access_token,
            })
        );

        setCookies('refresh_token', data?.refresh_token, 30);
        setCookies('access_token', data?.access_token, 7);
        setCookies('user', JSON.stringify(user), 7);

        if (user?.authorities[0]?.authority == 'ROLE_USER') {
            console.log(user?.authorities[0]);

            const redirectPath = localStorage.getItem('redirectAfterLogin');

            if (redirectPath) {
                localStorage.removeItem('redirectAfterLogin');
                payload.action(redirectPath);
            } else {
                payload.action('/');
            }
        } else if (user?.authorities[0]?.authority == 'ROLE_ADMIN') {
            payload.action('/admin');
        } else if (user?.authorities[0]?.authority == 'ROLE_SHIPPER') {
            payload.action('/admin/order-management-shipper');
        } else if (user?.authorities[0]?.authority == 'ROLE_CHEF') {
            payload.action('/admin/order-management-chef');
        } else {
            payload.action('/404');
        }
    } catch (e) {
        yield* put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield* put(auth.actions.setLoading(false));
    }
}

/**
 * handle create user
 */
function* handleCreateUser({ payload }) {
    yield put(common.actions.setLoading(true));

    try {
        yield call(userApi.createUser, payload);

        yield put(common.actions.setSuccessMessage('Create account successful'));
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e.message));
    } finally {
        yield put(common.actions.setLoading(false));
    }
}

//watch register
function* watchRegister() {
    yield* takeLatest(createUserAction, handleCreateUser);
}

// watch login
function* watchLogin() {
    yield* takeLatest(loginAction, handleLogin);
}

function* watchAuth() {
    yield* all([fork(watchLogin), fork(watchRegister)]);
}
export default watchAuth;
