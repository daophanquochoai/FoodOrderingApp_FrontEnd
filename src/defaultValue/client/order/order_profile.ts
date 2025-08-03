import { filter } from '@/defaultValue/common';
import { FilterOrder, OrderSlice } from '@/type/store/admin/order/order.style';

export const initFilter: FilterOrder = {
    ...filter,
    statusOrders: null,
    type: null,
    sort: 'desc',
    order: 'id',
};

export const initOrderProfileSlice: OrderSlice = {
    orders: {
        data: [],
        loading: false,
        filter: initFilter,
        totalPage: 0,
    },
    selectedOrder: null,
    loadingComponent: false,
};
