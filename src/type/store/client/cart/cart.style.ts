import { User } from '../../auth/authSlide';
import { Filter } from '../../common';
import { FoodSize } from '../collection/food.style';

export interface CartItem {
    id: number;
    foodId: FoodSize;
    quantity: number;
    priceAtTime: number;
    isActive: boolean;
}

export interface Cart {
    id: number;
    userId: User;
    isActive: boolean;
    cartItems: CartItem[];
}

export interface FilterCart extends Filter {
    deep: number;
    id: number[];
    isActive: boolean;
}

export interface CartSlice {
    filter: FilterCart;
    cart: Cart;
    loadingPage: boolean;
}
