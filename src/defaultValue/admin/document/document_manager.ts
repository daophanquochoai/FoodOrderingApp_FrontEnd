import { DocumentManagerType } from '@/type/store/admin/document/document_manager.style';

export const documentManager: DocumentManagerType = {
    documents: [],
    documentSelected: null,
    filter: {
        pageNo: 1,
        pageSize: 10,
        sortOrder: 'DESC',
        sortBy: 'id'
    },
    filterOption: {},
    loadingPage: false,
    loadingComponent: false,
    totalPage: 0
};