import { name } from '@/store/reducer/admin/history/history.reducer';
import { RootReducerType } from '@/store/reducer/rooReducer';
import { HistoryImportAdminSlice } from '@/type/store/admin/history/history.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state[name];

export const selectHistory = createSelector(
    selectState,
    (state: HistoryImportAdminSlice) => state.history
);

export const selectHistorySelected = createSelector(
    selectState,
    (state: HistoryImportAdminSlice) => state.selectedHistory
);

export const selectLoadingComponent = createSelector(
    selectState,
    (state: HistoryImportAdminSlice) => state.loadingComponent
);

export const selectFilter = createSelector(
    selectState,
    (state: HistoryImportAdminSlice) => state.history.filter
);

export const selectFilterOption = createSelector(
    selectState,
    (state: HistoryImportAdminSlice) => state.filterOption
);
