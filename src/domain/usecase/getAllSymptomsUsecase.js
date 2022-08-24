import SymptomRepository from '../repository/symptomsRepository';

export default async () => {
    const symptomRepository = new SymptomRepository();

    const response = await symptomRepository.getAll();

    if (response.status === 200) {
        return response.data
    }

    throw new Error('Não foi possível carregar os sintomas');
}