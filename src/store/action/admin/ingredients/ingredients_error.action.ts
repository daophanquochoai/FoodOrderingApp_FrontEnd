import { name } from '@/store/reducer/admin/ingredients/ingredients_error.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const ingredientsErrorAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(ingredientsErrorAction.firstFetch);

// fetch history ingredients 
export const fetchHistoryIngredients = createAction<{ id: number }>(`${name}/FETCH_HISTORY_INGREDIENTS`);

// add ingredients error
export const addIngredientsError = createAction(ingredientsErrorAction.create, (state) => ({
    payload: state,
}));

// update ingredients error
export const updateIngredientsError = createAction(`${name}/UPDATE_INGREDIENTS_ERROR`, (state) => ({
    payload: state,
}));

// change page
export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));