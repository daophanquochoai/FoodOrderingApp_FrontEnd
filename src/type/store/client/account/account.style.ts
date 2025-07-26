import { User } from '../../auth/authSlide';
import { Filter } from '../../common';

export interface Account {
    info: User;
    address: {
        data: Address[];
        filter: FilterAddress;
        loading: boolean;
        totalPage: number;
    };
    loading: boolean;
    loadingComponent: boolean;
}

export interface Address {
    id: number;
    province: string;
    commune: string;
    address: string;
    isDefault: boolean;
    isActive: boolean;
    phoneNumber: string;
    name: string;
}

export interface FilterAddress extends Filter {
    userId: number;
    isActive: boolean;
}
