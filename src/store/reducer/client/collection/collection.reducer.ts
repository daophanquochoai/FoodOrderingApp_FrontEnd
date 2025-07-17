import { initCollection } from '@/defaultValue/client/collection/collection';
import { Category } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'collection';

const CollectSlice = createSlice({
    name,
    initialState: initCollection,
    reducers: {
        setCategory(state, { payload }: PayloadAction<any>) {
            state.category = payload;
        },
        setSelectedCategory(state, { payload }: PayloadAction<any>) {
            state.selectedCategory = payload;
        },
    },
});

export const { actions } = CollectSlice;

export default CollectSlice;
