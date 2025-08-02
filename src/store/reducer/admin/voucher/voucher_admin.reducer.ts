import { initVoucherAdminSlice } from '@/defaultValue/admin/voucher/voucher';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'voucher_admin';

const VoucherAdminSlice = createSlice({
    name,
    initialState: initVoucherAdminSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.voucher.loading = payload;
        },
        setVoucher(state, { payload }: PayloadAction<any>) {
            state.voucher.data = payload;
        },
        setTotalVoucher(state, { payload }: PayloadAction<any>) {
            state.voucher.totalPage = payload;
        },
        setSelectVoucher(state, { payload }: PayloadAction<any>) {
            state.selectVoucher = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setFilterOption(state, { payload }: PayloadAction<any>) {
            state.filterOption = payload;
        },
    },
});

export const { actions } = VoucherAdminSlice;
export default VoucherAdminSlice;
