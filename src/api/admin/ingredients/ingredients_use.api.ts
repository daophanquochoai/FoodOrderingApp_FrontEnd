import HttpService from '@/config/httpService';

class IngredientsUseApi extends HttpService {
    getIngredientUseByOrderId = (orderId: number, token: string) => {
        return this.get(`ingredients_use/get_ingredients/${orderId}`, token);
    };
}

export const ingredientsUseApi = new IngredientsUseApi('ingredients_user');
