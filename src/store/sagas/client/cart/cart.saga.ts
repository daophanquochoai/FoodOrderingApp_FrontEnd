import { cartApi } from '@/api/client/cart/cart.api';
import { addToCart, deleteCartItem, fetchFirst } from '@/store/action/client/cart/cart.action';
import { cart, common } from '@/store/reducer';
import { selectAuth } from '@/store/selector/auth/auth.selector';
import { selectFitler } from '@/store/selector/client/cart/cart.selector';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

// handle fetch first
function* handleFetchFirst() {
    try {
        const { auth, filter } = yield all({
            auth: select(selectAuth),
            filter: select(selectFitler),
        });

        if (auth?.user?.authorities[0]?.authority != 'ROLE_USER') {
            return;
        }

        if (!auth?.user?.username) {
            // tao cart
        } else {
            const { data } = yield call(cartApi.getCartByUsername, auth?.user?.username, filter);
            yield put(cart.actions.setCart(data?.data?.data));
        }
    } catch (e) {
        console.error(e);
    }
}

//handle delete cart item
function* handleDeleteCartItem({ payload }) {
    yield put(cart.actions.setLoadingComponent(true));
    try {
        const { auth } = yield all({
            auth: select(selectAuth),
        });

        yield call(cartApi.deleteCartitem, payload, auth?.user?.username);

        // update cart
        yield handleFetchFirst();

        yield put(common.actions.setSuccessMessage('Remove Item Successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(cart.actions.setLoadingComponent(false));
    }
}

// handle add to cart
function* handleAddToCart({ payload }) {
    yield put(cart.actions.setLoadingPage(true));
    try {
        const { auth } = yield all({
            auth: select(selectAuth),
        });
        yield call(cartApi.addToCart, auth?.user?.username, payload);

        // update cart
        yield handleFetchFirst();
        yield put(common.actions.setSuccessMessage('Add To Cart Successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(cart.actions.setLoadingPage(false));
    }
}

//watch fetch first
function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

// watch delet cart item
function* watchDeleteItem() {
    yield takeEvery(deleteCartItem, handleDeleteCartItem);
}

// watch add cart item
function* watchAddToCart() {
    yield takeEvery(addToCart, handleAddToCart);
}

// watch cart
export function* watchCart() {
    yield* all([fork(watchFetchFirst), fork(watchDeleteItem), fork(watchAddToCart)]);
}
