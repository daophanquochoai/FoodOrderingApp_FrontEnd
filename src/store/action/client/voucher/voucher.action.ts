import { name } from '@/store/reducer/client/voucher/voucher.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const voucherAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(voucherAction.firstFetch);
