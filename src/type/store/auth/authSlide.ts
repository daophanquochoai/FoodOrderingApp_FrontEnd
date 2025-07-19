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

export interface createUser {
    id?: number;
    name?: string;
    phoneNumber?: string;
    image?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
    role?: {
        roleName?: string;
    };
}
