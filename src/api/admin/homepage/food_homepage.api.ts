import HttpService from '@/config/httpService';

class FoodHomepageApi extends HttpService {
    getLatestFoodHomepage() {
        return this.get('/food-homepage/all-latest');
    };
    getDealOfTheWeekHomepage() {
        return this.get('/food-homepage/all-deal-of-week');
    };
    addFoodHomepage(data: any) {
        return this.post(data, 'add');
    };
    deleteFoodHomepage(data: any, id: string) {
        return this.put(id, data, 'delete');
    };
}

export const foodHomepageApi = new FoodHomepageApi('food-homepage');