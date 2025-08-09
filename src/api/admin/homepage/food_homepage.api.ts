import HttpService from '@/config/httpService';

class FoodHomepageApi extends HttpService {
    getLatestFoodHomepage(token: string) {
        return this.get('/food-homepage/all-latest', token);
    }
    getDealOfTheWeekHomepage(token: string) {
        return this.get('/food-homepage/all-deal-of-week', token);
    }
    addFoodHomepage(data: any, token: string) {
        return this.post(data, 'add', token);
    }
    deleteFoodHomepage(data: any, id: string, token: string) {
        return this.put(id, data, 'delete', token);
    }
}

export const foodHomepageApi = new FoodHomepageApi('food-homepage');
