import { name } from '@/store/reducer/admin/ingredients/ingredients_error.reducer';
import { IngredientsErrorSlice } from '@/type/store/admin/ingredients/ingredients_error.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any) => state[name];

/* 
    Get ingredients error
*/
export const selectIngredientsError = createSelector(
    selectState,
    (state: IngredientsErrorSlice) => state.ingredientsError
);

/* 
    Get history ingredients
*/
export const selectHistoryIngredients = createSelector(
    selectState,
    (state) => state.historyIngredients
);

/*
    Get loading page
*/
export const selectLoadingPage = createSelector(
    selectState,
    (state: IngredientsErrorSlice) => state.loadingPage
);

/*
    Get loading history
*/
export const selectLoadingHistory = createSelector(
    selectState,
    (state: IngredientsErrorSlice) => state.loadingHistory
);

/*
    Get total page
*/
export const selectTotalPage = createSelector(
    selectState,
    (state: IngredientsErrorSlice) => state.totalPage
);

/*
    Get filter
*/
export const selectFilter = createSelector(
    selectState,
    (state: IngredientsErrorSlice) => state.filter
);

/*    
    Get selected ingredients error
*/
export const selectIngredientsErrorSelected = createSelector(
    selectState,
    (state: IngredientsErrorSlice) => state.ingredientsErrorSelected
);

/*
    Get loading component
*/
export const selectLoadingComponent = createSelector(
    selectState,
    (state: IngredientsErrorSlice) => state.loadingComponent
);