import { name } from '@/store/reducer/admin/category/category.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const categoryAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchCategoryFirst = createAction(categoryAction.firstFetch);
