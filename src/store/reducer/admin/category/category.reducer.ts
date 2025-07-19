import { initCategorySlice } from '@/defaultValue/admin/category/category';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'category';

const CategorySilce = createSlice({
    name,
    initialState: initCategorySlice,
    reducers: {
        setCategory(state, { payload }: PayloadAction<any>) {
            state.categorys = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setFilterOption(state, { payload }: PayloadAction<any>) {
            state.filterOption = {
                ...state.filterOption,
                category: payload,
            };
        },
        setLoading(state, { payload }: PayloadAction<any>) {
            state.loadingTable = payload;
        },
    },
});

export const { actions } = CategorySilce;
export default CategorySilce;
