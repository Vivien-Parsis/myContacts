import { Routes, Route } from "react-router";
import "./App.css";
import ProtectedRoute from "./components/protectedRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Contact from "./pages/contact";
import ContactModify from "./pages/contactModify";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route
					path="/login"
					element={
						<>
							<Login />
						</>
					}
				/>
				<Route
					path="/register"
					element={
						<>
							<Register />
						</>
					}
				/>
				<Route
					path="/"
					element={
						<>
							<ProtectedRoute>
								<Contact />
							</ProtectedRoute>
						</>
					}
				/>
				<Route
					path="/contact/modify"
					element={
						<>
							<ProtectedRoute>
								<ContactModify />
							</ProtectedRoute>
						</>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
