import { all, call, fork, put, takeLatest } from 'typed-redux-saga';
import { createUserAction, loginAction } from '../../action/auth/auth.action';
import { authApi } from '@/api/auth/authApi';
import { auth, common } from '@/store/reducer';
import { User } from '@/type/store/auth/authSlide';
import { userApi } from '@/api/client/user/user.api';
import { setCookies } from '@/utils/cookies/cookies';

function* handleLogin({ payload }) {
    const { username, password } = payload;

    try {
        yield* put(auth.actions.setLoading(true));

        const { data } = yield* call(authApi.login, { username, password });
        console.log(data);
        const user: User = data.data;
        yield* put(
            auth.actions.setAccount({
                user,
                token: data.access_token,
            })
        );

        setCookies('refresh_token', JSON.stringify(data?.refresh_token), 30);
        setCookies('access_token', JSON.stringify(data?.access_token), 7);
        setCookies('user', JSON.stringify(user), 7);

        window.location.href = '/';
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
