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
	const [fever, setfever] = useState("");
	const [discomfort, setdiscomfort] = useState("");
	const [nausea, setNausea] = useState("");
	const [taste, settaste] = useState("");
	const [rash, setrash] = useState("");
	const [joint, setjoint] = useState("");

	const [message, setmessage] = useState("");

	const handleDiagnosis = (e) => {
		e.preventDefault();
		setmessage("");
		if (
			breathing === "Yes" &&
			fever === "Yes" &&
			discomfort === "Yes" &&
			nausea === "Yes" &&
			taste === "Yes"
		) {
			setmessage(
				"You have coronavirus. Get vaccinated at the nearest health center. Please call 020 000 0000"
			);
			return null;
		} else {
			setmessage("You do not have Coronaviirus");
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

					<Label hint="General feeling of discomfort?" />
					<select
						value={discomfort}
						onChange={(e) => setdiscomfort(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Nausea and vomiting?" />
					<select
						value={nausea}
						onChange={(e) => setNausea(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Lost of taste or smell?" />
					<select
						value={settaste}
						onChange={(e) => settaste(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Muscle or joint pain?" />
					<select
						value={joint}
						onChange={(e) => setjoint(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Do you have a rash on skin?" />
					<select
						value={rash}
						onChange={(e) => setrash(e.target.value)}
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

export default CoronavirusQuestions;
