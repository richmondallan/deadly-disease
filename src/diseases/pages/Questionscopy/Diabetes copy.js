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

function DiabetesQuestions() {
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
			setmessage("You do not Diabetes");
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
					{/* <InputField type="text" hint="Name of Disease" error={errors.name?.message} register={register("name")} /> 
                        <Label hint="Do you feel increased hunger more often or occasionally?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} />
                         
                        <Label hint="General feeling of discomfort?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} />
                         
                        <Label hint="Nausea and vomiting?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} />

                        <Label hint="Do you have blurry vision?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} /> 

                        <Label hint="Frequent hunger?"/>
                        <InputField type="text" error={errors.name?.message} register={register("name")} /> 
                            
                        <InputTags
                            hint="Symptom"
                            error={selectedSymptomsError}
                            tags={selectedSymptoms}
                            suggestions={symptoms}
                            onDelete={onDelete}
                            onAddition={onAddition} /> 

                        <Label hint="Do you have sores that don't heal?"/>
                        <InputField type="text"  error={errors.description?.message} register={register("description")} />

                        <ActionButton text="Save" type="success" style={{ marginTop: "20px" }} />
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
*/}

					<Label hint="Do you feel increased hunger more often or occasionally?" />
					<select
						value={hunger}
						onChange={(e) => sethunger(e.target.value)}
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

					<Label hint="Do you have blurry vision?" />
					<select
						value={blurry}
						onChange={(e) => setblurry(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Do you have sores that don't heal?" />
					<select
						value={sores}
						onChange={(e) => setsores(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Have you lost weight" />
					<select
						value={weight}
						onChange={(e) => setweight(e.target.value)}
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

export default DiabetesQuestions;
