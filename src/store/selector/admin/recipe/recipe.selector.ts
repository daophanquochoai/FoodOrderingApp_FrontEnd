import { name } from '@/store/reducer/admin/recipe/recipe_management.reducer';
import { RootReducerType } from '@/store/reducer/rooReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state[name];

// food
export const selectFood = createSelector(selectState, (state) => state.food);

// filter option
export const selectFilterOption = createSelector(selectState, (state) => state.filterOption);

// fitler
export const selectFilter = createSelector(selectState, (state) => state.filter);

// ingredinet
export const selectIngredient = createSelector(selectState, (state) => state.ingredients);

// seleted
export const seletSelectedFood = createSelector(selectState, (state) => state.selectedFood);

// loading component
export const selectLoadingComponent = createSelector(
    selectState,
    (state) => state.loadingComponent
);

// loading
export const selectLoadingPage = createSelector(selectState, (state) => state.food.loading);
