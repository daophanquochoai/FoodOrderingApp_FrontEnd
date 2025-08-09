import HttpService from '@/config/httpService';

class FoodIngredientsApi extends HttpService {
    createIngredients = (data: any, id: string, token: string) => {
        return this.post(data, `add/${id}`, token);
    };
    updateIngredinet = (data: any, id: string, token: string) => {
        return this.put(id, data, 'update', token);
    };
}

export const foodIngredientsApi = new FoodIngredientsApi('food_ingredients');
