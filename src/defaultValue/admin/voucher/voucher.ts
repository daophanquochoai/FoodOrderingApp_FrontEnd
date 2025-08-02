import { filterVoucher } from '@/defaultValue/client/voucher/voucher';
import { VoucherAdminSlice } from '@/type/store/client/voucher/voucher.style';

export const initVoucherAdminSlice: VoucherAdminSlice = {
    voucher: {
        data: [],
        loading: false,
        totalPage: 0,
        filter: filterVoucher,
    },
    selectVoucher: null,
    loadingComponent: false,
    filterOption: null,
};
