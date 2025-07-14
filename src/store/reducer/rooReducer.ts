import { combineReducers } from 'redux';
import { auth, common } from '.';

const rootReducers = combineReducers({
    [auth.name]: auth.default.reducer,
    [common.name]: common.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
