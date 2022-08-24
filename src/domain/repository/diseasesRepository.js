import { httpClient } from '../../config/httpClient';

export default class DiseaseRepository {
    resource = '/diseases';

    save = (disease) => httpClient.post(this.resource, disease);

    getAll = (page) => httpClient.get(this.resource, {
        params: {
            page,
            pageSize: 10,
        }
    });

    getById = (id) => httpClient.get(`${this.resource}/${id}`);

    deleteById = (id) => httpClient.delete(`${this.resource}/${id}`);

}