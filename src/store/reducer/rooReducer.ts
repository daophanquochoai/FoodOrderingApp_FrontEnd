import { combineReducers } from "redux";
import authReducer, { name as authName } from "./auth/index.ts";  

const rootReducers = combineReducers({
    [authName]: authReducer,
})

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;