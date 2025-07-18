import { name } from '@/store/reducer/client/collection/collection.reducer';
import { Collection } from '@/type/store/client/collection/collection.style';
import { createSelector } from '@reduxjs/toolkit';

// select state
export const selectState = (state: any) => state[name];

/**
 * get category
 */
export const selectCategory = createSelector(selectState, (state: Collection) => state.category);

/**
 * get filter
 */
export const selectFilterCategory = createSelector(
    selectState,
    (state: Collection) => state.filter
);

/**
 * get select category
 */
export const selectSelectedCategory = createSelector(
    selectState,
    (state: Collection) => state.selectedCategory
);
