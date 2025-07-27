import { name } from '@/store/reducer/client/payment/payment.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const paymentAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(paymentAction.firstFetch);
