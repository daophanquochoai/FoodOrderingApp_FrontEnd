export interface AuthState {
    user: User;
    token: string | null;
    loading: boolean;
    error: string | null;
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

export interface User {
    id: number;
    name: string;
    phoneNumber: string;
    image: string;
    email: string;
    isActive: boolean;
    lastLogin: string;
    role: Role;
}

export interface Role {
    id: number;
    roleName: string;
}
