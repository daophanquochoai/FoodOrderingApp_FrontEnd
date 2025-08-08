import { name } from '@/store/reducer/admin/order/order.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const orderAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(orderAction.firstFetch);

