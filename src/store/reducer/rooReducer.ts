import { combineReducers } from 'redux';
import {
    account,
    auth,
    cart,
    category,
    checkout,
    collection,
    common,
    employee,
    food,
    foodManager,
    ingredients,
    order,
    payment,
    sources,
    voucher,
    voucher_admin,
} from '.';

const rootReducers = combineReducers({
    [auth.name]: auth.default.reducer,
    [common.name]: common.default.reducer,
    [collection.name]: collection.default.reducer,
    [food.name]: food.default.reducer,
    [category.name]: category.default.reducer,
    [cart.name]: cart.default.reducer,
    [foodManager.name]: foodManager.default.reducer,
    [ingredients.name]: ingredients.default.reducer,
    [sources.name]: sources.default.reducer,
    [account.name]: account.default.reducer,
    [payment.name]: payment.default.reducer,
    [voucher.name]: voucher.default.reducer,
    [checkout.name]: checkout.default.reducer,
    [employee.name]: employee.default.reducer,
    [order.name]: order.default.reducer,
    [voucher_admin.name]: voucher_admin.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
