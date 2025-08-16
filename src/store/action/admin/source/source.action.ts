import { name } from '@/store/reducer/admin/source/source.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

export const sourceAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(sourceAction.firstFetch);

//create source
export const createSource = createAction(sourceAction.create, (state) => ({
    payload: state,
}));

// update source
export const updateSource = createAction(sourceAction.update, (state) => ({
    payload: state,
}));

// load page
export const loadPage = createAction(`${name}/LOAD_PAGE`);

// change
export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));
