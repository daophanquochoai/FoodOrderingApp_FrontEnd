import { name } from '@/store/reducer/admin/ingredients/ingredients.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const ingredientAction = getCommonActionsTypeByName(name);

//fetch first
export const fetchFirst = createAction(ingredientAction.firstFetch);

// fetch history
export const fetchHistory = createAction(`${name}/HISTORY_INGREDIENT`);

// create ingredient
export const addIngredient = createAction(ingredientAction.create, (state) => ({
    payload: state,
}));

// change page
export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

// update ingredient
export const updateIngredient = createAction(`${name}/UPDATE_INGREDIENT`, (state) => ({
    payload: state,
}));
