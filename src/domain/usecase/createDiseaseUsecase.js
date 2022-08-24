import DiseaseRepository from '../repository/diseasesRepository';

export default (disease) => {
    const diseasesRepository = new DiseaseRepository();

    console.log(`Saving disease ${JSON.stringify(disease)}`);

    return diseasesRepository.save(disease);
}