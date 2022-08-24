import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import createDiseaseUsecase from "../../../domain/usecase/createDiseaseUsecase";
import getAllSymptomsUsecase from "../../../domain/usecase/getAllSymptomsUsecase";
import ActionButton from "../../../shared/components/ActionButton/ActionButton";
import Card from "../../../shared/components/Card/Card";
import Label from "../../../shared/components/Header/Label";
import InputField from "../../../shared/components/InputField/InputField";
import InputTags from "../../../shared/components/InputTags/InputTags";

const schema = yup
	.object({
		name: yup.string().required("Favor informar o nome"),
		description: yup.string().required("Favor informar a descrição"),
	})
	.required();

function CoronavirusQuestions() {
	const navigate = useNavigate();

	const [symptoms, setSymptoms] = useState([]);

	const [selectedSymptoms, setSelectedSymptoms] = useState([]);

	const [selectedSymptomsError, setSelectedSymptomsError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// load all symptoms to select
	useEffect(() => {
		getAllSymptomsUsecase().then((data) => {
			setSymptoms(data);
		});
	}, []);

	const onDelete = useCallback(
		(tagIndex) => {
			setSelectedSymptoms(selectedSymptoms.filter((_, i) => i !== tagIndex));
		},
		[selectedSymptoms]
	);

	const onAddition = useCallback(
		(newTag) => {
			setSelectedSymptoms([...selectedSymptoms, newTag]);
		},
		[selectedSymptoms]
	);

	const onSave = handleSubmit(async (data) => {
		if (!selectedSymptoms) {
			setSelectedSymptomsError("Selecione os sintomas");
			return;
		}

		// clear sympthoms error field
		setSelectedSymptomsError(null);

		const disease = {
			...data,
			symptoms: selectedSymptoms.map((ss) => ss.id),
		};

		await createDiseaseUsecase(disease);

		navigate("/");
	});

	const [breathing, setbreathing] = useState("");
	const [discomfort, setdiscomfort] = useState("");
	const [blurry, setblurry] = useState("");
	const [sores, setsores] = useState("");
	const [weight, setweight] = useState("");

	const [message, setmessage] = useState("");

	const handleDiagnosis = (e) => {
		e.preventDefault();
		setmessage("");
		if (
			breathing === "Yes" &&
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
				<Card title="Coronavirus Questions">
					<form className="form-disease" onSubmit={onSave}>
						{/*
						<Label hint="Do you have difficulty breathing?" />
						<InputField
							type="text"
							error={errors.name?.message}
							register={register("name")}
						/>

						<Label hint="Do you have fever" />
						<InputField
							type="text"
							error={errors.name?.message}
							register={register("name")}
						/>

						<Label hint="General feeling of discomfort?" />
						<InputField
							type="text"
							error={errors.name?.message}
							register={register("name")}
						/>

						<Label hint="Nausea and vomiting?" />
						<InputField
							type="text"
							error={errors.name?.message}
							register={register("name")}
						/>

						<Label hint="Lost of taste or smell?" />
						<InputField
							type="text"
							error={errors.name?.message}
							register={register("name")}
						/>

						<Label hint="Muscle or joint pain?" />
						<InputField
							type="text"
							error={errors.name?.message}
							register={register("name")}
						/>

						<Label hint="Do you have a rash on skin?" />
						<InputField
							type="text"
							error={errors.name?.message}
							register={register("name")}
						/>

						<InputTags
							hint="Symptom"
							error={selectedSymptomsError}
							tags={selectedSymptoms}
							suggestions={symptoms}
							onDelete={onDelete}
							onAddition={onAddition}
						/>

						 <InputField type="textarea" hint="Brief description" error={errors.description?.message} register={register("description")} /> 

						<ActionButton
							text="Save"
							type="success"
							style={{ marginTop: "20px" }}
						/>
                        */}

						<Label hint="Do you have difficulty breathing?" />
						<select
							value={breathing}
							onChange={(e) => setbreathing(e.target.value)}
							name={"fever"}
						>
							<option value={""}>--Select option--</option>
							<option value={"Yes"}>Yes</option>
							<option value={"No"}>No</option>
						</select>
					</form>
				</Card>
			</div>
		</main>
	);
}

export default CoronavirusQuestions;
