import { search } from '@/defaultValue/client/search/search';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'search';

const SearchSlice = createSlice({
    name,
    initialState: search,
    reducers: {
        setQuery(state, { payload }: PayloadAction<string>) {
            state.query = payload;
        },
        setResults(state, { payload }: PayloadAction<any[]>) {
            state.results = payload;
        },
        setLoading(state, { payload }: PayloadAction<boolean>) {
            state.loading = payload;
        },
    },
});

export const { actions } = SearchSlice;
export default SearchSlice;
