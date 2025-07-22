import HttpService from '@/config/httpService';

class FoodSizeApi extends HttpService {
    updateFoodSize = (data: any, id: any) => {
        return this.instance.put(`/food_size/update/${id}`, data);
    };
    createFoodSize = (data: any) => {
        return this.post(data, 'add');
    };
}

export const foodSizeApi = new FoodSizeApi('food_size');
