import HttpService from '@/config/httpService';

class IngredientsErrorApi extends HttpService {
    getAllByFitle = (filter : any, token : string) => {
        return this.post('')
    }
}

export const ingredientsErrorApi = new IngredientsErrorApi('ingredients_error');
