import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import createDiseaseUsecase from '../../../domain/usecase/createDiseaseUsecase';
import getAllSymptomsUsecase from '../../../domain/usecase/getAllSymptomsUsecase';
import ActionButton from "../../../shared/components/ActionButton/ActionButton";
import Card from "../../../shared/components/Card/Card";
import InputField from "../../../shared/components/InputField/InputField";
import InputTags from "../../../shared/components/InputTags/InputTags";

const schema = yup.object({
    name: yup.string().required('Favor informar o nome'),
    description: yup.string().required('Favor informar a descrição'),
}).required();

function Edit() {

    const navigate = useNavigate();

    const [symptoms, setSymptoms] = useState([])

    const [selectedSymptoms, setSelectedSymptoms] = useState([])

    const [selectedSymptomsError, setSelectedSymptomsError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // load all symptoms to select
    useEffect(() => {
        getAllSymptomsUsecase().then((data) => {
            setSymptoms(data);
        });
    }, []);

    const onDelete = useCallback((tagIndex) => {
        setSelectedSymptoms(selectedSymptoms.filter((_, i) => i !== tagIndex))
    }, [selectedSymptoms])

    const onAddition = useCallback((newTag) => {
        setSelectedSymptoms([...selectedSymptoms, newTag])
    }, [selectedSymptoms])

    const onSave = handleSubmit(async (data) => {
        if (!selectedSymptoms) {
            setSelectedSymptomsError('Selecione os sintomas');
            return;
        }

        // clear sympthoms error field
        setSelectedSymptomsError(null);

        const disease = { ...data, symptoms: selectedSymptoms.map(ss => ss.id) };

        await createDiseaseUsecase(disease);

        navigate('/');
    });

    return (
        <main className="page">
            <div className="content">
                <Card title="Nova Doença">
                    <form className="form-disease" onSubmit={onSave}>
                        <InputField type="text" hint="Nome ou apelido" error={errors.name?.message} register={register("name")} />

                        <InputTags
                            hint="Sintoma"
                            error={selectedSymptomsError}
                            tags={selectedSymptoms}
                            suggestions={symptoms}
                            onDelete={onDelete}
                            onAddition={onAddition} />

                        <InputField type="textarea" hint="Breve descrição" error={errors.description?.message} register={register("description")} />

                        <ActionButton text="Salvar" type="success" style={{ marginTop: "20px" }} />
                    </form>
                </Card>
            </div>
        </main>
    )
}

export default Edit;