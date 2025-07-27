import { CommonType, Filter } from '../type/store/common';

export const initCommonValue: CommonType = {
    messageQueue: [],
    loadingPage: false,
    modal: [],
};

export const filter: Filter = {
    pageNo: 0,
    pageSize: 10,
    search: '',
    sort: 'asc',
    order: 'id',
    startDate: null,
    endDate: null,
};
