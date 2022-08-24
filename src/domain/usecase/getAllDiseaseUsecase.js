import DiseaseRepository from "../repository/diseasesRepository"

export default async (page) => {
    const diseaseRepository = new DiseaseRepository()

    const response = await diseaseRepository.getAll(page)

    if (response.status === 200) {
        return response.data
    }

    throw new Error('Não foi possível buscar as doenças no momento')
}