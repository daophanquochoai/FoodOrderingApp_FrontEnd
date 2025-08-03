import { documentManager } from '@/defaultValue/admin/document/document_manager';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'document_manager';

const DocumentManagerSlice = createSlice({
    name,
    initialState: documentManager,
    reducers: {
        setLoading(state, { payload }: PayloadAction<boolean>) {
            state.loadingPage = payload;
        },
        setDocuments(state, { payload }: PayloadAction<any[]>) {
            state.documents = payload;
        },
        setFilter(state, { payload }: PayloadAction<any>) {
            state.filter = {
                ...state.filter,
                ...payload,
            };
        },
        setLoadingComponent(state, { payload }: PayloadAction<boolean>) {
            state.loadingComponent = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<number>) {
            state.totalPage = payload;
        },
    },
});

export const { actions } = DocumentManagerSlice;
export default DocumentManagerSlice;