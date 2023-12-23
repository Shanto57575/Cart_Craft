import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Products from "./Products";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [allProducts, setAllProducts] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);

	const handleFilteredPrice = (value) => {
		if (selectedFilters.includes(value)) {
			setSelectedFilters(selectedFilters.filter((check) => check !== value));
		} else {
			setSelectedFilters([...selectedFilters, value]);
		}
	};

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token, navigate]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		toast.success("Logged Out Successfully");
		navigate("/login");
	};

	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((res) => res.json())
			.then((data) => setAllProducts(data.products));
	}, []);

	const searchedProducts = allProducts.filter((product) => {
		const matchesSearch = `${product.title}`
			.toLowerCase()
			.includes(searchQuery);
		const matchesFilters =
			selectedFilters.length === 0 ||
			selectedFilters.some((filter) => {
				const [min, max] = filter.split("-");
				const price = product.price;
				return price >= parseInt(min, 10) && price <= parseInt(max, 10);
			});
		return matchesSearch && matchesFilters;
	});

	return (
		<div>
			<div className="flex items-center justify-around mt-8 font-serif">
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<button className="btn">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
						/>
					</svg>
					<div className="badge badge-secondary">{10}</div>
				</button>

				<button className="btn btn-primary" onClick={handleLogout}>
					Logout
					<Toaster />
				</button>
			</div>
			<Products
				allProducts={searchedProducts}
				handleFilteredPrice={handleFilteredPrice}
				selectedFilters={selectedFilters}
			/>
		</div>
	);
};

export default Home;
