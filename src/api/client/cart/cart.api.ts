import HttpService from '@/config/httpService';

class CartApi extends HttpService {
    getCartByUsername = (username: string, filter: any) => {
        return this.post(filter, `user/${username}/all`);
    };
    deleteCartitem = (cartItemId: any, username: any) => {
        return this.instance.put(`/cart/user/${username}/remove/${cartItemId}`, null);
    };
    addToCart = (username: any, data: any) => {
        return this.post(data, `user/${username}/add`);
    };
}

export const cartApi = new CartApi('cart');
