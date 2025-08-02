import { name } from '@/store/reducer/admin/voucher/voucher_admin.reducer';
import { RootReducerType } from '@/store/reducer/rooReducer';
import { VoucherAdminSlice } from '@/type/store/client/voucher/voucher.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state[name];

// get voucher
export const selectVoucher = createSelector(
    selectState,
    (state: VoucherAdminSlice) => state.voucher
);

// get filter
export const selectFilterVoucher = createSelector(
    selectState,
    (state: VoucherAdminSlice) => state.voucher.filter
);

//get select voucher
export const selectVoucherSelected = createSelector(
    selectState,
    (state: VoucherAdminSlice) => state.selectVoucher
);

// get loadingComponent
export const selectLoadingComponent = createSelector(
    selectState,
    (state: VoucherAdminSlice) => state.loadingComponent
);

// get filter option
export const selectFilterOption = createSelector(
    selectState,
    (state: VoucherAdminSlice) => state.filterOption
);
