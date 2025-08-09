import { name } from '@/store/reducer/admin/recipe/recipe_management.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const recipeAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(recipeAction.firstFetch);

// create
export const createRecipe = createAction(recipeAction.create, (state) => ({
    payload: state,
}));

// update
export const updateRecipe = createAction(recipeAction.update, (state) => ({
    payload: state,
}));

// change page
export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

// Recipe
export const fetchFilterOption = createAction(`${name}/FETCH_FILTER_OPTION`);

// fetch ingredients
export const fetchIngredinetsByFoodSize = createAction(
    `${name}/FETCH_INGREDIENTS_BY_FOOD_SIZE`,
    (state) => ({
        payload: state,
    })
);

// change filter
export const fetchFilter = createAction(`${name}/FILTER`);
