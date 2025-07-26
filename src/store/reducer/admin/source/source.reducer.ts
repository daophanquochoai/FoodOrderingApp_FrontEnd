import { initSourceSlice } from '@/defaultValue/admin/source/source';
import { selectLoadingComponent } from '@/store/selector/admin/food/food_manager.selector';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'source';

const SourceSlice = createSlice({
    name,
    initialState: initSourceSlice,
    reducers: {
        setSource(state, { payload }: PayloadAction<any>) {
            state.sources = payload;
        },
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.sources.loadingPage = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setSelectedSource(state, { payload }: PayloadAction<any>) {
            state.selectedFood = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.sources.totalPage = payload;
        },
        selectLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
    },
});

export const { actions } = SourceSlice;
export default SourceSlice;
