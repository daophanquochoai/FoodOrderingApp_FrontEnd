import { AuthState } from '../../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const authName = 'auth';

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlide = createSlice({
    name: authName,
    initialState: initialState,
    reducers: {
        loginRequest: (state, action: PayloadAction<{ email: string; password: string }>) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        },

        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlide.actions;
export default authSlide.reducer;
