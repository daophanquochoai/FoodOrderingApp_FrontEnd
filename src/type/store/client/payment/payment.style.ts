import { Filter } from '../../common';

export interface Payment {
    id: number;
    methodName: string;
    code: string;
    isActive: boolean;
}

export interface PaymentSlice {
    payment: {
        data: Payment[];
        filter: Filter;
        loading: boolean;
        totalPage: number;
    };
}
