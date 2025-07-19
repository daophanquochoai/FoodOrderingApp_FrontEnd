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

export interface Filter {
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
}
