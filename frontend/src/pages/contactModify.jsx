import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { apiUrl } from "../config/server";
import axios from "axios";
import "./contactModify.css";
import { telephonePattern } from "../config/pattern";

const ContactModify = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const [modifyError, setModifyError] = useState("");
	const [updatedContact, setUpdatedContact] = useState({
		firstName: location.state?.contact?.firstName || "",
		lastName: location.state?.contact?.lastName || "",
		email: location.state?.contact?.email || "",
		telephone: location.state?.contact?.telephone || "",
		id: location.state?.contact?._id || ""
	});
	const handleModify = async (e) => {
		setModifyError("");
		e.preventDefault();
		if (!token) {
			console.log("manque token");
			navigate("/login");
		} else if (
			updatedContact.telephone.length !== 10 ||
			!telephonePattern.test(updatedContact.telephone)
		) {
			console.log("telephone incorect");
			setModifyError("telephone incorect");
		} else {
			await axios
				.put(`${apiUrl}/contact`, updatedContact, {
					headers: { authorization: "Bearer " + token }
				})
				.then(() => {
					navigate("/");
				})
				.catch(() => {
					console.log("erreur lors de la modification");
					setModifyError("erreur lors de la modification");
					navigate("/");
				});
		}
	};
	const handleChangeModify = (e) => {
		setUpdatedContact({
			...updatedContact,
			[e.target.name]: e.target.value
		});
	};

	useEffect(() => {
		if (!location.state?.contact) {
			navigate("/");
		}
	});
	return (
		<>
			<Link to="/">Revenir a mes contacts</Link>
			<form className="modifyContact" onSubmit={handleModify}>
				<h2>Ajouter un contact</h2>
				<label htmlFor="firstName">Prenom :</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					value={updatedContact.firstName}
					onChange={handleChangeModify}
					required
				></input>
				<label htmlFor="lastName">Nom :</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					value={updatedContact.lastName}
					onChange={handleChangeModify}
					required
				></input>
				<label htmlFor="email">Email :</label>
				<input
					type="email"
					id="email"
					name="email"
					value={updatedContact.email}
					onChange={handleChangeModify}
					required
				></input>
				<label htmlFor="telephone">Telephone :</label>
				<input
					type="tel"
					id="telephone"
					name="telephone"
					value={updatedContact.telephone}
					onChange={handleChangeModify}
					required
				></input>
				<button type="submit">Ajouter</button>
				<span style={{ color: "red" }}>{modifyError}</span>
			</form>
		</>
	);
};
export default ContactModify;
