import { name } from '@/store/reducer/admin/ingredients/ingredient_use.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const ingredientUseAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(ingredientUseAction.firstFetch, (state) => ({
    payload: state,
}));

// update order
export const updateOrder = createAction(ingredientUseAction.update, (state) => ({
    payload: state,
}));
