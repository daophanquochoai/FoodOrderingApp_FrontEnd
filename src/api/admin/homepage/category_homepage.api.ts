import HttpService from '@/config/httpService';

class CategoryHomepageApi extends HttpService {
    getCategoryHomepage() {
        return this.get('/category-homepage/all');
    };
    addCategoryHomepage(data: any) {
        return this.post(data, 'add');
    };
    deleteCategoryHomepage(data: any, id: number) {
        return this.put(id, data, 'delete');
    };
}

export const categoryHomepageApi = new CategoryHomepageApi('category-homepage');
