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
import "../../../shared/components/InputField/input-field.css";

const schema = yup
	.object({
		name: yup.string().required("Favor informar o nome"),
		description: yup.string().required("Favor informar a descrição"),
	})
	.required();

function MalariaQuestions() {
	const navigate = useNavigate();

	const [fever, setfever] = useState("");
	const [vomiting, setvomiting] = useState("");
	const [diarrhea, setDiarrhea] = useState("");
	const [muscle, setMuscle] = useState("");
	const [fatigue, setFatigue] = useState("");
	const [coughing, setcoughing] = useState("");

	const [message, setmessage] = useState("");

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

	const handleDiagnosis = (e) => {
		e.preventDefault();
		setmessage("");
		if (
			fever === "Yes" &&
			vomiting === "Yes" &&
			diarrhea === "Yes" &&
			fatigue === "Yes"
		) {
			setmessage(
				"You have malaria. Best Drug: ACTs. Dosage: Will be prerscribed upon purchase at pharmacy. The drug can be bought at Top up Pharmacy amongst a few otheres. CALL 0501537575 to talk to pharmacy."
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
				<form
					onSubmit={handleDiagnosis}
					className="form-disease"
					style={{ width: 400, marginTop: 100 }}
				>
					{/*   <Label hint="Do you have fever"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} />
       
                        <Label hint="General feeling of discomfort?"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} />
                         
                        <Label hint="Nausea and vomiting?"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} />

                        <Label hint="Diarrhea?"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} /> 

                        <Label hint="Muscle or joint pain?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} /> 

                        <Label hint="Fatigue?"/>
                        <InputField type="text"  error={errors.name?.message} register={register("name")} />  

                        {/* <InputField type="text" hint="" error={errors.name?.message} register={register("name")} /> 

                        <Label hint="Are you coughing?"/>
                        <InputField type="text" error={errors.description?.message} register={register("description")} />
                        <InputTags
                            hint="Symptom"
                            error={selectedSymptomsError}
                            tags={selectedSymptoms}
                            suggestions={symptoms}
                            onDelete={onDelete}
                            onAddition={onAddition} />
                            
                        <ActionButton text="Save" type="success" style={{ marginTop: "20px" }} />*/}

					<Label hint="Do you have fever" />
					<select
						value={fever}
						onChange={(e) => setfever(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Nausea and vomiting?" />
					<select
						value={vomiting}
						onChange={(e) => setvomiting(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Diarrhea?" />
					<select
						value={diarrhea}
						onChange={(e) => setDiarrhea(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Muscle or joint pain?" />
					<select
						value={muscle}
						onChange={(e) => setMuscle(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Fatigue?" />
					<select
						value={fatigue}
						onChange={(e) => setFatigue(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Are you coughing?" />
					<select
						value={coughing}
						onChange={(e) => setcoughing(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					{message && (
						<p style={{ color: "white", marginTop: 10 }}>{message}</p>
					)}
					<button
						style={{
							width: "100%",
							height: 45,
							marginTop: 20,
							marginBottom: 20,
							backgroundColor: "green",
							color: "white",
							border: 0,
							borderRadius: 5,
						}}
					>
						Diagnosis
					</button>
				</form>
			</div>
		</main>
	);
}

export default MalariaQuestions;
