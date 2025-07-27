import { name } from '@/store/reducer/client/voucher/voucher.reducer';
import { VoucherSlice } from '@/type/store/client/voucher/voucher.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any) => state[name];

// voucher
export const selectVoucher = createSelector(selectState, (state: VoucherSlice) => state.voucher);

// filter
export const selectFilter = createSelector(
    selectState,
    (state: VoucherSlice) => state.voucher.filter
);
