import { name } from '@/store/reducer/admin/document/document_manager.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const documentManagerAction = getCommonActionsTypeByName(name);

// Fetch first (load initial data)
export const fetchFirst = createAction(documentManagerAction.firstFetch);

// Fetch documents
export const fetchDocuments = createAction(`${name}/FETCH_DOCUMENTS`);

// Upload document
export const uploadDocument = createAction(`${name}/UPLOAD_DOCUMENT`, (state) => ({
    payload: state,
}));

// Download document
export const downloadDocument = createAction(`${name}/DOWNLOAD_DOCUMENT`, (state) => ({
    payload: state,
}));

// Change page
export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));