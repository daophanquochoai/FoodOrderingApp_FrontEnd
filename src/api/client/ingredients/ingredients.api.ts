import HttpService from '@/config/httpService';

class IngredientsApi extends HttpService {
    getIngredients = (filter: any) => {
        return this.post(filter, 'all');
    };
    getHistoryIngredients = (filter: any, id: string) => {
        return this.post(filter, `history/${id}`);
    };
    createIngredient = (data: any) => {
        return this.post(data, 'create');
    };
    updateIngredient = (data: any, id: any) => {
        return this.instance.put(`/ingredients/update/${id}`, data);
    };
}

export const ingredientApi = new IngredientsApi('ingredients');
