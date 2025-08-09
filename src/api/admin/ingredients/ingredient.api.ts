import HttpService from '@/config/httpService';
import { PayloadAction } from '@reduxjs/toolkit';

class IngredientApi extends HttpService {
    getIngredientByFilter = (id: string, token: string) => {
        return this.post(null, `food_size/${id}`, token);
    };
}

export const ingredientApi = new IngredientApi('ingredients');
