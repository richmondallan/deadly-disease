import { httpClient } from '../../config/httpClient';

export default class SymptomsRepository {
    resource = '/symptoms';

    save = (symptom) => httpClient.post(this.resource, symptom);

    getAll = () => httpClient.get(this.resource);

    getById = (id) => httpClient.get(`${this.resource}/${id}`);

    deleteById = (id) => httpClient.delete(`${this.resource}/${id}`);

}