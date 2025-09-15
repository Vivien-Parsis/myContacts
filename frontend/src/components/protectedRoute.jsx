import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
	let auth = localStorage.getItem("token");
	if (!auth) {
		return <Navigate to="/login" />;
	}
	try {
		const decoded = jwtDecode(auth);
		if (!decoded.email) {
			alert("token jwt invalide");
			localStorage.removeItem("token");
			return <Navigate to="/login" />;
		} else {
			return children;
		}
	} catch (err) {
		console.log(err);
		alert("token jwt invalide");
		localStorage.removeItem("token");
		return <Navigate to="/login" />;
	}
};

export default ProtectedRoute;
