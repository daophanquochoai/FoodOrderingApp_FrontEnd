import { name } from '@/store/reducer/client/search/search.reducer';
import { Search } from '@/type/store/client/search/search.style';
import { createSelector } from '@reduxjs/toolkit';

const selectSearchState = (state: any) => state[name];

export const selectSearchQuery = createSelector(
    selectSearchState,
    (state: Search) => state.query || ''
);

export const selectSearchResults = createSelector(
    selectSearchState,
    (state: Search) => state.results || []
);

export const selectSearchLoading = createSelector(
    selectSearchState,
    (state: Search) => state.loading || false
);

export const selectHasSearchResults = createSelector(
    selectSearchResults,
    (results: any[]) => results.length > 0
);

export const selectSearchResultsCount = createSelector(
    selectSearchResults,
    (results: any[]) => results.length
);