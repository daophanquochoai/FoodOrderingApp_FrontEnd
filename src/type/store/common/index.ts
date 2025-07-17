export interface CommonType {
    messageQueue: MessageType[];
    loadingPage: boolean;
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
