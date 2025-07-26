import { name } from '@/store/reducer/admin/source/source.reducer';
import { SourceSlice } from '@/type/store/admin/source/source.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any) => state[name];

// get sources
export const selectSource = createSelector(selectState, (state: SourceSlice) => state.sources);

// get filter
export const selectFilter = createSelector(selectState, (state: SourceSlice) => state.filter);

//get selected source
export const selectSourceSelected = createSelector(
    selectState,
    (state: SourceSlice) => state.selectedFood
);

// get loading component
export const selectLoadingComponent = createSelector(
    selectState,
    (state: SourceSlice) => state.loadingComponent
);
