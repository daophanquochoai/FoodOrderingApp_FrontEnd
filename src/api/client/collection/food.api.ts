import HttpService from '@/config/httpService';
import { FilterFood } from '@/type/store/client/collection/food.style';

class FoodApi extends HttpService {
    getFoodByFilter = (data: FilterFood) => {
        return this.post(data, 'all');
    };
}

export const foodApi = new FoodApi('food');
