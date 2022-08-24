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

function RespiratoryQuestions() {
    
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

    const [hunger, sethunger] = useState("");
	const [discomfort, setdiscomfort] = useState("");
	const [blurry, setblurry] = useState("");
	const [sores, setsores] = useState("");
	const [weight, setweight] = useState("");

	const [message, setmessage] = useState("");

	const handleDiagnosis = (e) => {
		e.preventDefault();
		setmessage("");
		if (
			hunger === "Yes" &&
			discomfort === "Yes" &&
			blurry === "Yes" &&
			sores === "Yes" &&
			weight === "Yes"
		) {
			setmessage(
				"You have diabetes. For type 1 diabetes Insulin is the main treatment. Dosage: Will be prescribed upon purchase at pharmacy due to varied demography. For type 2 diabetesmanage your diet, thus take fruits and vegetables and exerciose regularly. Proceed to medication if there is no improvement in health conditioin. The drug can be bought at Top up Pharmacy amongst a few otheres. CALL 0501537575 to talk to pharmacy."
			);
			return null;
		} else {
			setmessage("You do not have malaria");
			return null;
		}
	};


    return (
        <main className="page">
            <div className="content">
                <Card title="Respiratory Questions">
                    <form className="form-disease" onSubmit={onSave}> 

                         <Label hint="Diarrhea?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} />


                        <Label hint="Diarrhea?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} />


                        <Label hint="Diarrhea?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} />

                        <Label hint="Diarrhea?"/>
                        <InputField type="text" error={errors.description?.message} register={register("description")} />

                        <InputTags
                            hint="Symptom"
                            error={selectedSymptomsError}
                            tags={selectedSymptoms}
                            suggestions={symptoms}
                            onDelete={onDelete}
                            onAddition={onAddition} /> 

                        <ActionButton text="Save" type="success" style={{ marginTop: "20px" }} />
                    </form>
                </Card>
            </div>
        </main>
    )
}

export default RespiratoryQuestions;