import HttpService from '@/config/httpService';

class IngredientsErrorApi extends HttpService {
    getIngredientsError = (filter: any, token: string) => {
        return this.post(filter, 'all', token);
    };
    getHistoryIngredientsByHistoryId = (id: any, token: string) => {
        return this.get(`/ingredients_error/get_ingredients/${id}`, token);
    };
    addIngredientsError = (data: any, token: string) => {
        return this.post(data, 'add', token);
    };
    updateIngredientsError = (data: any, id: any, token: string) => {
        return this.put(id, data, 'update', token);
    };
}

export const ingredientsErrorApi = new IngredientsErrorApi('ingredients_error');