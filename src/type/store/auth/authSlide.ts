export interface AuthState {
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    username: string | null;
    password: string | null;
}

export interface User {
    authorities: string;
    username: string;
}
