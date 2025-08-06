import { name } from '@/store/reducer/client/search/search.reducer';
import { createAction } from '@reduxjs/toolkit';

export const searchFoods = createAction(`${name}/SEARCH_FOODS`, (state) => ({
    payload: state,
}));
export const setSearchResults = createAction(`${name}/SET_SEARCH_RESULTS`, (state) => ({
    payload: state,
}));
export const setSearchLoading = createAction(`${name}/SET_SEARCH_LOADING`, (state) => ({
    payload: state,
}));
export const clearSearchResults = createAction(`${name}/CLEAR_SEARCH_RESULTS`);