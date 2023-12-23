import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Products from "./Products";

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [allProducts, setAllProducts] = useState([]);

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

	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((res) => res.json())
			.then((data) => setAllProducts(data.products));
	}, []);

	const searchedProducts = searchQuery
		? allProducts.filter((product) =>
				`${product.title}`.toLowerCase().includes(searchQuery)
		  )
		: allProducts;

	return (
		<div>
			<div className="flex items-center justify-around mt-8 font-serif">
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<button className="btn btn-primary" onClick={handleLogout}>
					Logout
				</button>
			</div>
			<Products allProducts={searchedProducts} />
		</div>
	);
};

export default Home;
