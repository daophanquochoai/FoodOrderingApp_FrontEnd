import { fork } from 'typed-redux-saga';
import watchAuth from './auth/authSaga';
import { watchCollection } from './client/collection/collection.saga';
import { watchCategogy } from './admin/category/category.saga';
import { watchCommon } from './common/common.saga';
import { watchCart } from './client/cart/cart.saga';
import { watchFoodManager } from './admin/food/food_manager.saga';
import { watchIngredients } from './admin/ingredients/ingredients.saga';
import { watchSource } from './admin/source/source.saga';
import { watchAccount } from './client/account/account.saga';
import { watchPayment } from './client/payment/payment.saga';
import { watchVoucher } from './client/voucher/voucher.saga';
import { watchCheckout } from './client/checkout/checkout.saga';
import { watchEmployee } from './admin/employee/employee.saga';
import { watchOrder } from './admin/order/order.saga';
import { watchDocumentManager } from './admin/document/document_manager.saga';
import { watchVoucherAdmin } from './admin/voucher/voucher_admin.saga';
import { watchHistory } from './admin/history/history.saga';

export default function* rootSaga() {
    yield* fork(watchAuth);
    yield* fork(watchCollection);
    yield* fork(watchCategogy);
    yield* fork(watchCommon);
    yield* fork(watchCart);
    yield* fork(watchFoodManager);
    yield* fork(watchIngredients);
    yield* fork(watchSource);
    yield* fork(watchAccount);
    yield* fork(watchPayment);
    yield* fork(watchVoucher);
    yield* fork(watchCheckout);
    yield* fork(watchEmployee);
    yield* fork(watchOrder);
    yield* fork(watchDocumentManager);
    yield* fork(watchVoucherAdmin);
    yield* fork(watchHistory);
}
