import { documentApi } from '@/api/admin/document/document.api';
import { common } from '@/store/reducer';
import {
    changePage,
    downloadDocument,
    fetchDocuments,
    fetchFirst,
    uploadDocument,
} from '@/store/action/admin/document/document_manager.action';
import DocumentManagerSlice from '@/store/reducer/admin/document/document_manager.reducer';
import { selectFilter } from '@/store/selector/admin/document/document_manager.selector';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';
import { getCookies } from '@/utils/cookies/cookies';

/**
 * Handle fetch first (initial load)
 */
function* handleFetchFirst() {
    yield put(DocumentManagerSlice.actions.setLoading(true));
    try {
        yield* handleFetchDocuments();
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage('Failed to load documents'));
    } finally {
        yield put(DocumentManagerSlice.actions.setLoading(false));
    }
}

/**
 * Handle fetch documents
 */
function* handleFetchDocuments() {
    const { filter } = yield all({
        filter: select(selectFilter),
    });

    try {
        const response = yield call(documentApi.getDocuments, filter);
        console.log('API response:', response);

        let documents = [];
        let totalPage = 1;

        // Truy cập đúng cấu trúc response.data.data
        if (response?.data?.data) {
            // Trường hợp response là { data: { message: '...', data: { page: 1, totalPage: 1, data: [...] } } }
            if (response.data.data.data && Array.isArray(response.data.data.data)) {
                documents = response.data.data.data.map((doc) => ({
                    ...doc,
                    create_at: doc.createdAt, // Thêm trường create_at từ createdAt
                }));
                totalPage = response.data.data.totalPage || 1;
                console.log('Found documents in data.data.data:', documents.length);
            }
            // Nếu data là mảng trực tiếp (không có nested data.data)
            else if (Array.isArray(response.data.data)) {
                documents = response.data.data;
                console.log('Found documents in data.data:', documents.length);
            }
        }

        yield put(DocumentManagerSlice.actions.setDocuments(documents));
        yield put(DocumentManagerSlice.actions.setTotalPage(totalPage));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage('Failed to fetch documents'));
        yield put(DocumentManagerSlice.actions.setDocuments([]));
    }
}

/**
 * Handle upload document
 */
function* handleUploadDocument({ payload }) {
    yield put(DocumentManagerSlice.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(documentApi.uploadDocument, payload.formData, token);

        yield put(common.actions.setSuccessMessage('Document uploaded successfully'));

        // Re-fetch documents to update the list
        yield* handleFetchDocuments();

        if (payload.onSuccess) {
            payload.onSuccess(data);
        }
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message || 'Failed to upload document'));

        if (payload.onError) {
            payload.onError(e);
        }
    } finally {
        yield put(DocumentManagerSlice.actions.setLoadingComponent(false));
    }
}

/**
 * Handle download document
 */
function* handleDownloadDocument({ payload }) {
    yield put(DocumentManagerSlice.actions.setLoadingComponent(true));
    try {
        const response = yield call(documentApi.downloadDocument, payload.id.toString());

        // Create blob and download
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', payload.name || `document-${payload.id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        yield put(common.actions.setSuccessMessage('Document downloaded successfully'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage('Failed to download document'));
    } finally {
        yield put(DocumentManagerSlice.actions.setLoadingComponent(false));
    }
}

/**
 * Handle change page
 */
function* handleChangePage({ payload }) {
    const { filter } = yield all({
        filter: select(selectFilter),
    });

    yield put(
        DocumentManagerSlice.actions.setFilter({
            ...filter,
            pageNo: payload,
        })
    );

    yield* handleFetchDocuments();
}

// Watch functions
function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

function* watchFetchDocuments() {
    yield* takeEvery(fetchDocuments, handleFetchDocuments);
}

function* watchUploadDocument() {
    yield* takeEvery(uploadDocument, handleUploadDocument);
}

function* watchDownloadDocument() {
    yield* takeEvery(downloadDocument, handleDownloadDocument);
}

function* watchChangePage() {
    yield* takeEvery(changePage, handleChangePage);
}

export function* watchDocumentManager() {
    yield all([
        fork(watchFetchFirst),
        fork(watchFetchDocuments),
        fork(watchUploadDocument),
        fork(watchDownloadDocument),
        fork(watchChangePage),
    ]);
}
