import { fetchFirst } from '@/store/action/common/common.action';
import { auth } from '@/store/reducer';
import { getCookies } from '@/utils/cookies/cookies';
import { all, fork, put, takeEvery } from 'typed-redux-saga';

function* handleFetchFirst({ payload }) {
    const access_token = getCookies('access_token');
    const user = getCookies('user');

    if (!user || !access_token) {
        return;
    }

    try {
        const userParse = JSON.parse(user);

        if (userParse?.authorities[0]?.authority == 'ROLE_ADMIN') {
            payload('admin');
        }

        yield* put(
            auth.actions.setAccount({
                user: userParse,
                token: access_token,
            })
        );
    } catch (error) {
        yield* put(
            auth.actions.setAccount({
                userParse: user,
                token: access_token,
            })
        );
    }
}

function* watchFetchFirst() {
    yield* takeEvery(fetchFirst, handleFetchFirst);
}

export function* watchCommon() {
    yield* all([fork(watchFetchFirst)]);
}
