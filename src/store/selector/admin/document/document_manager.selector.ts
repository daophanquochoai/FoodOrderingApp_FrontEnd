import { name } from '@/store/reducer/admin/document/document_manager.reducer';
import { DocumentManagerType } from '@/type/store/admin/document/document_manager.style';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: any) => state[name];

/**
 * Get documents
 */
export const selectDocuments = createSelector(
    selectState,
    (state: DocumentManagerType) => state.documents
);

/**
 * Get filter
 */
export const selectFilter = createSelector(
    selectState,
    (state: DocumentManagerType) => state.filter
);

/**
 * Get loading page
 */
export const selectLoadingPage = createSelector(
    selectState,
    (state: DocumentManagerType) => state.loadingPage
);

/**
 * Get filter options
 */
export const selectFilterOption = createSelector(
    selectState,
    (state: DocumentManagerType) => state.filterOption
);

/**
 * Get loading component
 */
export const selectLoadingComponent = createSelector(
    selectState,
    (state: DocumentManagerType) => state.loadingComponent
);

/**
 * Get total pages
 */
export const selectTotalPage = createSelector(
    selectState,
    (state: DocumentManagerType) => state.totalPage
);