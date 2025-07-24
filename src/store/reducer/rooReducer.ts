import { combineReducers } from 'redux';
import { auth, cart, category, collection, common, food, foodManager, ingredients } from '.';

const rootReducers = combineReducers({
    [auth.name]: auth.default.reducer,
    [common.name]: common.default.reducer,
    [collection.name]: collection.default.reducer,
    [food.name]: food.default.reducer,
    [category.name]: category.default.reducer,
    [cart.name]: cart.default.reducer,
    [foodManager.name]: foodManager.default.reducer,
    [ingredients.name]: ingredients.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
