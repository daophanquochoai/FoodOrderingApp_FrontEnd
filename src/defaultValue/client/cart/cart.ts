import { Cart, CartSlice, FilterCart } from '@/type/store/client/cart/cart.style';

export const initCart: Cart = {
    id: 0,
    userId: null,
    isActive: false,
    cartItems: [],
};

export const filterCart: FilterCart = {
    pageNo: 0,
    pageSize: 10,
    search: '',
    sort: 'asc',
    order: 'id',
    startDate: null,
    endDate: null,
    deep: 1,
    id: null,
    isActive: true,
};

export const initCartSlice: CartSlice = {
    cart: initCart,
    filter: filterCart,
    loadingPage: false,
    loadingComponent: false,
};
