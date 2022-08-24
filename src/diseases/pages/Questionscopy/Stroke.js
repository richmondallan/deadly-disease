import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import createDiseaseUsecase from '../../../domain/usecase/createDiseaseUsecase';
import getAllSymptomsUsecase from '../../../domain/usecase/getAllSymptomsUsecase';
import ActionButton from "../../../shared/components/ActionButton/ActionButton";
import Card from "../../../shared/components/Card/Card";
import Label from '../../../shared/components/Header/Label';
import InputField from "../../../shared/components/InputField/InputField";
import InputTags from "../../../shared/components/InputTags/InputTags";


const schema = yup.object({
    name: yup.string().required('Favor informar o nome'),
    description: yup.string().required('Favor informar a descrição'),
}).required();

function StrokeQuestions() {
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
                <Card title="Stroke Questions">
                    <form className="form-disease" onSubmit={onSave}> 

                        <Label hint="Do you see shortcomings in the face?"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} />
 
                        <Label hint="Do you experience sudden confusion or trouble speaking?"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} />
       
                        <Label hint="Is there an abrupt disarray or inconvenience talking?"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} />
        
                        <Label hint="Do you experience sudden difficulty walking or dizziness?"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} />

                        {/* <InputField type="text" hint="Diarrhea?" error={errors.name?.message} register={register("name")} />  */}

                        <Label hint="Do you have vision issues?" />
                        <InputField type="text" hint="Do you have vision issues?" error={errors.name?.message} register={register("name")} /> 
 
                        {/* <InputField type="text" hint="Fatigue?" error={errors.name?.message} register={register("name")} />   */}

                        <InputTags
                            hint="Symptom"
                            error={selectedSymptomsError}
                            tags={selectedSymptoms}
                            suggestions={symptoms}
                            onDelete={onDelete}
                            onAddition={onAddition} />

                        {/* <InputField type="textarea" hint="Brief description" error={errors.description?.message} register={register("description")} /> */}

                        <ActionButton text="Save" type="success" style={{ marginTop: "20px" }} />
                    </form>
                </Card>
            </div>
        </main>
    )
}

export default StrokeQuestions;