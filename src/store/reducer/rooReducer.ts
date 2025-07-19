import { combineReducers } from 'redux';
import { auth, collection, common, food } from '.';

const rootReducers = combineReducers({
    [auth.name]: auth.default.reducer,
    [common.name]: common.default.reducer,
    [collection.name]: collection.default.reducer,
    [food.name]: food.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
