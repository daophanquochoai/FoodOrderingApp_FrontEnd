import { Voucher } from '@/type/voucher/voucher';
import { FoodSize } from '../../client/collection/food.style';
import { Filter } from '../../common';

export interface Payment {
    code: string;
    id: number;
    isActive: boolean;
    methodName: string;
}

export interface OrderItem {
    foodId: FoodSize;
    id: number;
    isActive: boolean;
    priceAtTime: number;
    quantity: number;
}

export interface Order {
    id: number;
    totalPrice: number;
    transactionCode: string;
    shipFee: number;
    address: string;
    status: string;
    tableNumber: number;
    name: string;
    phoneNumber: string;
    createTime: string;
    updateTime: string;
    nameUpdated: string;
    message: string;
    orderItems: OrderItem[];
    discountApplied: Voucher;
    paymentId: Payment;
}

export interface FilterOrder extends Filter {
    statusOrders: EStatusOrder[];
    type: boolean;
}

export enum EStatusOrder {
    CREATING,
    PENDING,
    PROCESSING,
    COMPLETE,
    SHIPPING,
    RECEIVE,
    CANCEL,
}

export interface OrderSlice {
    orders: {
        data: Order[];
        filter: FilterOrder;
        totalPage: number;
        loading: boolean;
    };
    selectedOrder: Order | null;
    loadingComponent: boolean;
}
