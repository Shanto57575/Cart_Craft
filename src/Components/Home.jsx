import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token, navigate]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-evenly mt-10 font-serif">
			<input
				type="text"
				placeholder="search products"
				className="input input-bordered input-info w-full max-w-xs"
			/>
			<button className="btn btn-primary" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default Home;
