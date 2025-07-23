import HttpService from '@/config/httpService';
import { FilterFood } from '@/type/store/client/collection/food.style';

class FoodApi extends HttpService {
    getFoodByFilter = (data: FilterFood) => {
        return this.post(data, 'all');
    };
    getFoodById = (id: number) => {
        return this.getOne(id);
    };
    updateFoodById = (id: any, data: any) => {
        return this.instance.put(`/food/update/${id}`, data);
    };
    addFood = (data: any) => {
        return this.post(data, 'add');
    };
}

export const foodApi = new FoodApi('food');
