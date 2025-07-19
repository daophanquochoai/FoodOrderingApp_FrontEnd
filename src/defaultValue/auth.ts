import { AuthState } from '@/type/store/auth/authSlide';

export const initAutDefault: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    username: '',
    password: '',
};
