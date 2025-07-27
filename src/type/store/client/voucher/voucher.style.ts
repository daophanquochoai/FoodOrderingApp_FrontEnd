import { Filter } from '../../common';

export interface Voucher {
    id: number;
    code: string;
    discountType: EVoucher;
    discountValue: number;
    desc: string;
    maxDiscount: number;
    maxUse: number;
    usedCount: number;
    startDate: Date;
    endDate: Date;
    status: EStatusVoucher;
}

export enum EVoucher {
    PERCENT,
    CASH,
}

export enum EStatusVoucher {
    ACTIVE,
    EXPIRED,
    DELETE,
}

export interface FilterVoucher extends Filter {
    id: number[];
    max: number;
    foodIds: number[];
    sizeIds: number[];
    forFood: boolean;
    forCategory: boolean;
    categoryIds: number[];
    statusVouchers: EVoucher[];
}

export interface VoucherSlice {
    voucher: {
        data: Voucher[];
        loading: boolean;
        totalPage: number;
        filter: FilterVoucher;
    };
}
