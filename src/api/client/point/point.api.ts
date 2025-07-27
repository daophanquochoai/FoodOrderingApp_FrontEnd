import HttpService from '@/config/httpService';

class PointApi extends HttpService {
    getPoint = (userId: any, token: string) => {
        return this.get(`point/${userId}`, token);
    };
}

export const pointApi = new PointApi('point');
