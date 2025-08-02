import { initHistoryAdminSlice } from '@/defaultValue/admin/history/history';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'history-import';

const HistoryIngredientSlice = createSlice({
    name,
    initialState: initHistoryAdminSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.history.loading = payload;
        },
        setHistory(state, { payload }: PayloadAction<any>) {
            state.history.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.history.totalPage = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.history.filter = payload;
        },
        setSelectHistory(state, { payload }: PayloadAction<any>) {
            state.selectedHistory = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setFilterOption(state, { payload }: PayloadAction<any>) {
            state.filterOption = payload;
        },
    },
});

export const { actions } = HistoryIngredientSlice;
export default HistoryIngredientSlice;
