import { name } from '@/store/reducer/admin/homepage/homepage.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const homepageManagementAction = getCommonActionsTypeByName(name);

export const fetchCategoryHomepage = createAction(`${name}/FETCH_CATEGORY_HOMEPAGE`);
export const setCategories = createAction(`${name}/SET_CATEGORIES`, (state) => ({
    payload: state,
}));
export const setCategoriesLoading = createAction(`${name}/SET_CATEGORIES_LOADING`, (state) => ({
    payload: state, 
}));
export const addCategoryToHomepage = createAction(`${name}/ADD_CATEGORY_TO_HOMEPAGE`, (state) => ({
    payload: state,
}));
export const removeCategoryFromHomepage = createAction(`${name}/REMOVE_CATEGORY_FROM_HOMEPAGE`, (state) => ({
    payload: state,
}));

export const fetchLatestProducts = createAction(`${name}/FETCH_LATEST_PRODUCTS`);
export const setLatestProducts = createAction(`${name}/SET_LATEST_PRODUCTS`, (state) => ({
    payload: state,
}));
export const setLatestProductsLoading = createAction(`${name}/SET_LATEST_PRODUCTS_LOADING`, (state) => ({
    payload: state,
}));
export const addProductToLatest = createAction(`${name}/ADD_PRODUCT_TO_LATEST`, (state) => ({
    payload: state,
}));
export const removeProductFromHomepage = createAction(`${name}/REMOVE_PRODUCT_FROM_HOMEPAGE`, (state) => ({
    payload: state,
}));

export const fetchDealOfWeek = createAction(`${name}/FETCH_DEAL_OF_WEEK`);
export const setDealOfWeek = createAction(`${name}/SET_DEAL_OF_WEEK`, (state) => ({
    payload: state,
}));
export const setDealOfWeekLoading = createAction(`${name}/SET_DEAL_OF_WEEK_LOADING`, (state) => ({
    payload: state,
}));
export const addDealOfWeek = createAction(`${name}/ADD_DEAL_OF_WEEK`, (state) => ({
    payload: state,
}));