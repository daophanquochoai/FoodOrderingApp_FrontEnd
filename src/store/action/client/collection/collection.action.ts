import { name } from '@/store/reducer/common/common.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const collectionAction = getCommonActionsTypeByName(name);

export const firstFetch = createAction(collectionAction.firstFetch);

export const fetchFoodById = createAction(`${name}/PRODUCT_BY_ID`, (id) => ({
    payload: id,
}));
