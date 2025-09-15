import { Link, useNavigate } from "react-router";
import "./contact.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config/server";

const Contact = () => {
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [newContact, setNewContact] = useState({
		firstName: "",
		lastName: "",
		email: "",
		telephone: ""
	});
	const token = localStorage.getItem("token");

	const handleChangeAdd = (e) => {
		setNewContact({
			...newContact,
			[e.target.name]: e.target.value
		});
	};

	const handleDisconnect = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	const handleDelete = async (id) => {
		await axios
			.delete(`${apiUrl}/contact`, {
				data: { id: id },
				headers: { authorization: "Bearer " + token }
			})
			.then()
			.catch(() => {
				alert("erreur lors de la récupération des contacts");
			});
		await axios
			.get(`${apiUrl}/contact`, {
				headers: { authorization: "Bearer " + token }
			})
			.then((res) => {
				setContacts(res.data);
			})
			.catch(() => {
				alert("erreur lors de la récupération des contacts");
			});
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		if (
			!newContact.email ||
			!newContact.telephone ||
			!newContact.firstName ||
			!newContact.lastName
		) {
			alert("manque des informations");
		} else if (!newContact.telephone.length !== 10) {
			alert("longueur du telephone incorrect");
		} else {
			await axios
				.post(`${apiUrl}/contact`, newContact, {
					headers: { authorization: "Bearer " + token }
				})
				.then()
				.catch(() => {
					alert("erreur lors de l'ajout des contacts");
				});
			await axios
				.get(`${apiUrl}/contact`, {
					headers: { authorization: "Bearer " + token }
				})
				.then((res) => {
					console.log(res.data);
					setContacts(res.data);
				})
				.catch(() => {
					alert("erreur lors de la récupération des contacts");
				});
		}
	};

	const showContacts = () => {
		const res = [];
		if (!contacts) {
			return;
		} else {
			console.log(contacts);
			contacts.map((c) => {
				res.push(
					<div key={c._id}>
						<ul>
							<li>Prenom : {c.firstName || "?"}</li>
							<li>Nom : {c.lastName || "?"}</li>
							<li>Email : {c.email || "?"}</li>
							<li>Telephone : {c.telephone || "?"}</li>
							<Link to="/contact/modify" state={{ contact: c }}>
								Modifier
							</Link>
							<button onClick={() => handleDelete(c._id)}>
								Supprimer
							</button>
						</ul>
					</div>
				);
			});
		}
		return res;
	};

	useEffect(() => {
		const fetchContact = async () => {
			if (!token) {
				alert("erreur avec le token");
				return;
			} else {
				console.log("e");
				await axios
					.get(`${apiUrl}/contact`, {
						headers: { authorization: "Bearer " + token }
					})
					.then((res) => {
						res.data.forEach((el) => {
							el.showModify = false;
						});
						setContacts(res.data);
					})
					.catch(() => {
						alert("erreur lors de la récupération des contacts");
					});
			}
		};
		fetchContact();
	}, [token]);

	return (
		<>
			{showContacts()}
			<form className="addContact" onSubmit={handleAdd}>
				<h2>Ajouter un contact</h2>
				<label htmlFor="firstName">Prenom :</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					value={newContact.firstName}
					onChange={handleChangeAdd}
					required
				></input>
				<label htmlFor="lastName">Nom :</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					value={newContact.lastName}
					onChange={handleChangeAdd}
					required
				></input>
				<label htmlFor="email">Email :</label>
				<input
					type="email"
					id="email"
					name="email"
					value={newContact.email}
					onChange={handleChangeAdd}
					required
				></input>
				<label htmlFor="telephone">Telephone :</label>
				<input
					type="tel"
					id="telephone"
					name="telephone"
					value={newContact.telephone}
					onChange={handleChangeAdd}
					minLength="10"
					maxLength="10"
					required
				></input>
				<button type="submit">Ajouter</button>
			</form>
			<button onClick={handleDisconnect}>Se deconnecter</button>
		</>
	);
};

export default Contact;
