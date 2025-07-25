import { fork } from 'typed-redux-saga';
import watchAuth from './auth/authSaga';
import { watchCollection } from './client/collection/collection.saga';
import { watchCategogy } from './admin/category/category.saga';
import { watchCommon } from './common/common.saga';
import { watchCart } from './client/cart/cart.saga';
import { watchFoodManager } from './admin/food/food_manager.saga';
import { watchIngredients } from './admin/ingredients/ingredients.saga';

export default function* rootSaga() {
    yield* fork(watchAuth);
    yield* fork(watchCollection);
    yield* fork(watchCategogy);
    yield* fork(watchCommon);
    yield* fork(watchCart);
    yield* fork(watchFoodManager);
    yield* fork(watchIngredients);
}
