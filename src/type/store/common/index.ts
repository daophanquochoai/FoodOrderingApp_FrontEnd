export interface CommonType {
    messageQueue: MessageType[];
    loadingPage: boolean;
    modal: ModalState[];
}

export type MessageType = {
    id: string;
    message: string;
    status: 'success' | 'info' | 'warning' | 'error';
    hasShow: boolean;
};

export class Filter {
    pageNo?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    order?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface ModalState {
    data?: Record<string, any>;
    type?: ModalType;
    variant?: string;
}

export enum ModalType {
    DETAIL_PRODUCT = 'DETAIL_PRODUCT',
    ADDRESS = 'ADDRESS',
    CATEGORY = 'CATEGORY',
    REVIEW = 'REVIEW',
    INGREDIENT = 'INGREDIENT',
    SPOIL_INGREDIENT = 'SPOIL_INGREDIENT',
    PRODUCT_MANAGEMENT = 'PRODUCT_MANAGEMENT',
    VOUCHER = 'VOUCHER',
    SOURCE_MANAGEMENT = 'SOURCE_MANAGEMENT',
    ORDER_MANAGEMENT = 'ORDER_MANAGEMENT',
    ORDER_CHEF = 'ORDER_CHEF',
    RECIPE_MANAGEMENT = 'RECIPE_MANAGEMENT',
    EMP_ACCCOUNT_MANAGEMENT = 'EMP_ACCCOUNT_MANAGEMENT',
    IMPORT_MANAGEMENT = 'IMPORT_MANAGEMENT',
}

export interface PageObject<T> {
    data: T[];
    totalPage: number;
    loadingPage: boolean;
}
