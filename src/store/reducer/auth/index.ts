import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initAutDefault } from '../../../defaultValue/auth';

export const name = 'auth';

const authSlicer = createSlice({
    name,
    initialState: initAutDefault,
    reducers: {
        loginSuccess(state, { payload }: PayloadAction<any>) {
            state.user = payload;
        },
        setAccount(state, { payload }: PayloadAction<any>) {
            state = {
                ...state,
                ...payload,
            };
        },
        setUsername(state, { payload }: PayloadAction<string>) {
            state.username = payload;
        },
        setPassword(state, { payload }: PayloadAction<string>) {
            state.password = payload;
        },
        setLoading(state, { payload }: PayloadAction<boolean>) {
            state.loading = payload;
        },
        setError(state, { payload }: PayloadAction<string>) {
            state.error = payload;
        },
    },
});

export const { actions } = authSlicer;

export default authSlicer;
