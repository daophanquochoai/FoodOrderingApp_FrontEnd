import HttpService from '@/config/httpService';

class CategoryHomepageApi extends HttpService {
    getCategoryHomepage(token: string) {
        return this.get('/category-homepage/all', token);
    }
    addCategoryHomepage(data: any, token: string) {
        return this.post(data, 'add', token);
    }
    deleteCategoryHomepage(data: any, id: number, token: string) {
        return this.put(id, data, 'delete', token);
    }
}

export const categoryHomepageApi = new CategoryHomepageApi('category-homepage');
