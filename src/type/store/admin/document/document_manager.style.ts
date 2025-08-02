export interface Document {
    id: number;
    name: string;
    size: number;
    url: string;
    is_active: boolean;
    create_by: number | null;   
    late_update_time: string;
    create_at: string;
}

export interface DocumentFilter {
    pageNo: number;
    pageSize: number;
    keyword?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    startDate?: string;
    endDate?: string;
    create_by?: number[];
}

export interface DocumentManagerType {
    documents: Document[];
    documentSelected: Document | null;
    filter: DocumentFilter;
    filterOption: any;
    loadingPage: boolean;
    loadingComponent: boolean;
    totalPage: number;
}