import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { apiUrl } from "../config/server";

const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		lastName: "",
		firstName: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert("mot de passes non identiques");
		} else if (
			!formData.password ||
			!formData.email ||
			!formData.confirmPassword ||
			!formData.lastName ||
			!formData.firstName
		) {
			alert("manque de parametres");
		} else {
			axios
				.post(`${apiUrl}/auth/register`, formData)
				.then((res) => {
					if (res.data.token) {
						localStorage.setItem("token", res.data.token);
						navigate("/");
					} else {
						alert("erreur de connexion");
					}
				})
				.catch(() => {
					alert("erreur de connexion serveur");
				});
		}
	};
	return (
		<form onSubmit={handleSubmit} className="registerForm">
			<h2>Se connecter</h2>
			<label htmlFor="email">email :</label>
			<input
				type="email"
				id="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				required
			/>
			<label htmlFor="password">mot de passe :</label>
			<input
				type="password"
				id="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				required
			/>
			<label htmlFor="confirmPassword">confirmer mot de passe :</label>
			<input
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				required
			/>
			<label htmlFor="firstName">Prénom :</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				value={formData.firstName}
				onChange={handleChange}
				required
			/>
			<label htmlFor="lastName">Nom :</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				value={formData.lastName}
				onChange={handleChange}
				required
			/>
			<button type="submit">Se connecter</button>
		</form>
	);
};

export default Register;
