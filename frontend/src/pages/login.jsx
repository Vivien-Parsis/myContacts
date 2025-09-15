import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { apiUrl } from "../config/server";

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${apiUrl}/auth/login`, formData)
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
	};
	return (
		<form onSubmit={handleSubmit} className="loginForm">
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
			<button type="submit">Se connecter</button>
			<Link to="/register">Pas de compte ? S'inscrire</Link>
		</form>
	);
};

export default Login;
