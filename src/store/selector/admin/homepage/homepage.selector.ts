import { name } from '@/store/reducer/admin/homepage/homepage.reducer';
import { HomepageManagementState } from '@/type/store/admin/homepage/homepage.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any): HomepageManagementState => state[name];

export const selectCategories = createSelector(
    selectState,
    (state) => state.categories
);
export const selectHomepageCategories = createSelector(
    selectState,
    (state) => state.homepageCategories
);
export const selectCategoriesLoading = createSelector(
    selectState,
    (state) => state.categoriesLoading
);

export const selectProducts = createSelector(
    selectState,
    (state) => state.products
);
export const selectLatestProducts = createSelector(
    selectState,
    (state) => state.latestProducts
);
export const selectLatestProductsLoading = createSelector(
    selectState,
    (state) => state.latestProductsLoading
);

export const selectDealOfWeek = createSelector(
    selectState,
    (state) => state.dealOfWeek
);
export const selectDealOfWeekLoading = createSelector(
    selectState,
    (state) => state.dealOfWeekLoading
);