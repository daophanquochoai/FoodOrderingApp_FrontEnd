import { pointApi } from '@/api/client/point/point.api';
import {
    fetchFirst,
    paymentAction,
    usePointAction,
} from '@/store/action/client/checkout/checkout.action';
import { checkout, common } from '@/store/reducer';
import { selectInfo } from '@/store/selector/client/account/account.selector';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';
import { handleFetchInfo } from '../account/account.saga';
import { getCookies } from '@/utils/cookies/cookies';
import { shipApi } from '@/api/client/ship/ship.api';
import {
    selectCheckout,
    selectShip,
    selectTotal,
} from '@/store/selector/client/checkout/checkout.selector';
import { EStatusOrder } from '@/type/store/client/checkout/checkout.style';
import { orderApi } from '@/api/client/order/order.api';
import { selectCart } from '@/store/selector/client/cart/cart.selector';

function* handleFetchFirst() {
    yield put(checkout.actions.setLoading(true));
    try {
        yield handleFetchPoint();
        yield handleFetchShip();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(checkout.actions.setLoading(false));
    }
}

function* handleFetchShip() {
    try {
        const token = getCookies('access_token');
        const { data } = yield call(shipApi.getShip, token);
        const ship = {
            baseFee: data?.data?.baseFee,
            feePerKm: data?.data?.feePerKm,
            minOrderForFeeShipping: data?.data?.minOrderForFeeShipping,
            rushHourFee: data?.data?.rushHourFee,
        };
        yield put(checkout.actions.setShip(ship));
    } catch (e) {
        console.error(e);
    }
}

function* handleFetchPoint() {
    try {
        const { info } = yield all({
            info: select(selectInfo),
        });

        if (info == null) {
            yield handleFetchInfo();
        }
        const { account } = yield all({
            account: select(selectInfo),
        });

        const token = getCookies('access_token');
        const { data } = yield call(pointApi.getPoint, account?.id, token);
        yield put(checkout.actions.setPoint(data?.point || 0));
    } catch (e) {
        console.error(e);
    }
}

function* handlePaymentAction({ payload }) {
    try {
        const { info, total, cart, ship, checkout } = yield all({
            info: select(selectInfo),
            total: select(selectTotal),
            cart: select(selectCart),
            ship: select(selectShip),
            checkout: select(selectCheckout),
        });

        const data = {
            userId: {
                id: info?.id,
            },
            totalPrice: total,
            paymentId: {
                code: payload?.payment?.selectedPaymentMethod,
            },
            transactionCode: '',
            discountApplied: {
                id: checkout?.discountApply,
            },
            shipFee: ship || 0,
            address:
                payload?.address?.address?.address +
                ', ' +
                payload?.address?.address?.commune +
                ', ' +
                payload?.address?.address?.provine,
            status: EStatusOrder.CREATING.toString(),
            tableNumber: null,
            shipperId: null,
            name: payload?.address?.address?.name,
            phoneNumber: payload?.address?.address?.phoneNumber,
            orderItems: cart?.cartItems.map((item) => {
                return {
                    foodId: { id: item?.foodId?.id },
                    quantity: item?.quantity,
                    priceAtTime: (item?.foodId?.price * (100 - item?.foodId?.discount)) / 100,
                    isActive: true,
                };
            }),
            point: checkout?.point?.used || 0,
        };
        const token = getCookies('access_token');

        yield call(orderApi.order, data, token);
        yield put(common.actions.setSuccessMessage('Order Successfull'));
        payload.action();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    }
}

function* handleUsePoint({ payload }) {
    try {
        yield put(checkout.actions.setUsePoint(payload));
    } catch (e) {
        console.error(e);
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

function* watchUsePoint() {
    yield takeEvery(usePointAction, handleUsePoint);
}

function* watchPayment() {
    yield takeEvery(paymentAction, handlePaymentAction);
}

export function* watchCheckout() {
    yield* all([fork(watchFetchFirst), fork(watchUsePoint), fork(watchPayment)]);
}
