import { all, call, fork, put, takeLatest } from 'typed-redux-saga';
import { loginAction } from '../../action/auth/auth.action';
import { authApi } from '@/api/auth/authApi';
import { auth } from '@/store/reducer';
import { User } from '@/type/store/auth/authSlide';

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
    } catch (e) {
        yield* put(auth.actions.setError(e.message));
    } finally {
        yield* put(auth.actions.setLoading(false));
    }
}

function* watchLogin() {
    yield* takeLatest(loginAction, handleLogin);
}

function* watchAuth() {
    yield* all([fork(watchLogin)]);
}
export default watchAuth;
