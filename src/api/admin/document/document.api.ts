import HttpService from '@/config/httpService';

class DocumentApi extends HttpService {
    getDocuments = (data: any) => {
        return this.post(data, 'all');
    };
    uploadDocument = (data: FormData) => {
        return this.upload(data);
    };
    downloadDocument = (id: string) => {
        return this.get<Blob>(`/document/download/${id}`, undefined, {}, 'blob');
    };
}

export const documentApi = new DocumentApi('document');