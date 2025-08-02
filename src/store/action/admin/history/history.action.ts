import { name } from '@/store/reducer/admin/history/history.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const historyAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(historyAction.firstFetch);

export const deleteHistoryImport = createAction(historyAction.delete, (state) => ({
    payload: state,
}));

export const addHistoryImport = createAction(historyAction.create, (state) => ({
    payload: state,
}));
