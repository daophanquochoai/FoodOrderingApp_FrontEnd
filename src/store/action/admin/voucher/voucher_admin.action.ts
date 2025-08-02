import { name } from '@/store/reducer/admin/voucher/voucher_admin.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const voucherAdminAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(voucherAdminAction.firstFetch);

export const updateVoucher = createAction(voucherAdminAction.update, (state) => ({
    payload: state,
}));

export const createVoucher = createAction(voucherAdminAction.create, (state) => ({
    payload: state,
}));

export const exportVoucher = createAction(`${name}/EXPORT_VOUCHER`, (state) => ({
    payload: state,
}));
