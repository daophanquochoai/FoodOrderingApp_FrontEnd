import { name } from '@/store/reducer/admin/ingredients/ingredient_use.reducer';
import { RootReducerType } from '@/store/reducer/rooReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state[name];

export const selectLoading = createSelector(selectState, (state) => state.ingredients.loading);

export const selectIngredientUse = createSelector(selectState, (state) => state.ingredients.data);

export const selectLoadingComponent = createSelector(
    selectState,
    (state) => state.loadingComponent
);
