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

function StrokeQuestions() {
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

	const [shortcomings, setshortcomings] = useState("");
	const [confusion, setconfusion] = useState("");
	const [disarray, setdisarray] = useState("");
	const [dizziness, setdizziness] = useState("");
	const [vision, setvision] = useState("");

	const [message, setmessage] = useState("");

	const handleDiagnosis = (e) => {
		e.preventDefault();
		setmessage("");
		if (
			shortcomings === "Yes" &&
			confusion === "Yes" &&
			disarray === "Yes" &&
			dizziness === "Yes" &&
			vision === "Yes"
		) {
			setmessage(
				"You have stroke. Best drug: L-Arginine. Dosage: Oral administration within 30 minutes of a stroke significantly decreases frequency and severity of stroke epiosodes. Call diamondhealthhub for a pack of L-Arginine. Call 055 803 2699. diamondhealthhub is one of the pharmacy amongst many with stocks of the best drug"
			);
			return null;
		} else {
			setmessage("You do not have Stroke");
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
					<Label hint="Do you see shortcomings in the face?" />
					<select
						value={shortcomings}
						onChange={(e) => setshortcomings(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Do you experience sudden confusion or trouble speaking?" />
					<select
						value={confusion}
						onChange={(e) => setconfusion(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Is there an abrupt disarray or inconvenience talking?" />
					<select
						value={disarray}
						onChange={(e) => setdisarray(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					<Label hint="Do you experience sudden difficulty walking or dizziness?" />
					<select
						value={dizziness}
						onChange={(e) => setdizziness(e.target.value)}
						name={"fever"}
					>
						<option value={""}>--Select option--</option>
						<option value={"Yes"}>Yes</option>
						<option value={"No"}>No</option>
					</select>

					{/* <InputField type="text" hint="Diarrhea?" error={errors.name?.message} register={register("name")} />  */}

					<Label hint="Do you have vision issues?" />
					<select
						value={vision}
						onChange={(e) => setvision(e.target.value)}
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

export default StrokeQuestions;
