import { combineReducers } from 'redux';
import authReducer, { name as authName } from './auth/index.ts';
import { common } from './index.ts';

const rootReducers = combineReducers({
    [authName]: authReducer,
    [common.name]: common.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
