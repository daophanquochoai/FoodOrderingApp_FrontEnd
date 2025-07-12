// src/features/auth/authSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../redux/slide/authSlide';
import { AxiosResponse } from 'axios';
import { authService } from '../api/authApi';
import { AuthState } from '../type';

function* loginSaga(
    action: ReturnType<typeof loginRequest>
): Generator<any, void, AxiosResponse<AuthState>> {
    try {
        const { email, password } = action.payload;
        const response = yield call(() => authService.login({ email, password }));
        yield put(loginSuccess({ user: response?.data.user, token: response?.data.token || '' }));
    } catch (error: any) {
        yield put(loginFailure(error.message || 'Login failed'));
    }
}

export function* watchAuthSaga() {
    yield takeLatest(loginRequest.type, loginSaga);
}
