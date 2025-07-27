import { filter } from '@/defaultValue/common';
import { FilterVoucher, VoucherSlice } from '@/type/store/client/voucher/voucher.style';

export const filterVoucher: FilterVoucher = {
    ...filter,
    id: null,
    max: null,
    foodIds: null,
    sizeIds: null,
    forFood: null,
    forCategory: null,
    categoryIds: null,
    statusVouchers: null,
};

export const initVoucherSlice: VoucherSlice = {
    voucher: {
        data: [],
        loading: false,
        totalPage: 0,
        filter: filterVoucher,
    },
};
