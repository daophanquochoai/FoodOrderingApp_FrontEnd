import { filter } from '@/defaultValue/common';
import { FilterOrder, OrderSlice } from '@/type/store/admin/order/order.style';

export const initFilterOrder: FilterOrder = {
    ...filter,
    statusOrders: [],
    type: null,
};

export const initOrderSlice: OrderSlice = {
    orders: {
        data: [],
        filter: initFilterOrder,
        totalPage: 0,
        loading: false,
    },
    selectedOrder: null,
    loadingComponent: false,
    errorStripe: '',
};
