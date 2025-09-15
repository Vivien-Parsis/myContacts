import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { apiUrl } from "../config/server";
import axios from "axios";
import "./contactModify.css";

const ContactModify = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const [updatedContact, setUpdatedContact] = useState({
		firstName: location.state.contact.firstName || "",
		lastName: location.state.contact.lastName || "",
		email: location.state.contact.email || "",
		telephone: location.state.contact.telephone || "",
		id: location.state.contact._id || ""
	});
	const handleModify = async (e) => {
		e.preventDefault();
		if (!token) {
			alert("manque token");
			navigate("/login");
		} else if (updatedContact.telephone.length !== 10) {
			alert("telephone incorect");
		} else {
			await axios
				.put(`${apiUrl}/contact`, updatedContact, {
					headers: { authorization: "Bearer " + token }
				})
				.then(() => {
					navigate("/");
				})
				.catch(() => {
					alert("erreur lors de la modification");
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
			</form>
		</>
	);
};
export default ContactModify;
