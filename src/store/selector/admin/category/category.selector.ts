import { name } from '@/store/reducer/admin/category/category.reducer';
import { CategorySlice } from '@/type/store/admin/category/category.style';
import { createSelector } from '@reduxjs/toolkit';

/**
 * select state
 */
export const selectState = (state: any) => state[name];

/**
 * get category
 */
export const selectCategoryAdmin = createSelector(
    selectState,
    (state: CategorySlice) => state.categorys
);

/**
 * get filter
 */
export const selectFilter = createSelector(selectState, (state: CategorySlice) => state.filter);

/**
 * get filter option
 */
export const selectFilterOption = createSelector(
    selectState,
    (state: CategorySlice) => state.filterOption
);

/**
 * get loading page
 */
export const selectLoadingTable = createSelector(
    selectState,
    (state: CategorySlice) => state.loadingTable
);
