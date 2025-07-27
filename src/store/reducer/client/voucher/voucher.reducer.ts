import { initVoucherSlice } from '@/defaultValue/client/voucher/voucher';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'voucher';

const VoucherSlice = createSlice({
    name,
    initialState: initVoucherSlice,
    reducers: {
        setLoading(state, {payload} : PayloadAction<any>){
            state.voucher.loading = payload;
        },
        setFilter(state, {payload} : PayloadAction<any>){
            state.voucher.filter = payload;
        },
        setVoucher(state, {payload} : PayloadAction<any>){
            state.voucher.data = payload
        },
        setTotalPage(state, {payload} : PayloadAction<any>){
            state.voucher.totalPage = payload;
        }
    },
});

export const { actions } = VoucherSlice;
export default VoucherSlice;
