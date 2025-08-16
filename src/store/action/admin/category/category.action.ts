import { name } from '@/store/reducer/admin/category/category.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const categoryAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchCategoryFirst = createAction(categoryAction.firstFetch);

// create category
export const createCategory = createAction(categoryAction.create, (data) => ({
    payload: data,
}));

// update category
export const updateCategory = createAction(categoryAction.update, (data) => ({
    payload: data,
}));

// delete category
export const deleteCategory = createAction(categoryAction.delete, (data) => ({
    payload: data,
}));

// change
export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));
