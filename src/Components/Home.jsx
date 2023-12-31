import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Products from "./Products";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [allProducts, setAllProducts] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
	const [cart, setCart] = useState(initialCart);

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

	const handleAddToCart = (product) => {
		console.log(product);
		const newCart = [...cart, product];
		setCart(newCart);
		toast.success("Product Added to Cart!");
	};

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const totalAmount = cart.reduce((total, product) => total + product.price, 0);

	return (
		<div>
			<div className="lg:flex items-center sm:justify-center md:justify-evenly mt-5 mx-3">
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<div className="text-center">
					<button className="btn mt-2 text-center">
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
						<div className="badge badge-secondary">{cart.length}</div>
						<div className="badge badge-accent">Total : ${totalAmount}</div>
					</button>
				</div>
				<div className="text-center">
					<button
						className="btn bg-red-500 text-black hover:bg-red-600 mt-2"
						onClick={() => setCart([])}
					>
						Clear Cart
					</button>
					<button className="btn btn-primary mt-2 ml-2" onClick={handleLogout}>
						Logout
						<Toaster />
					</button>
				</div>
			</div>
			<Products
				allProducts={searchedProducts}
				handleFilteredPrice={handleFilteredPrice}
				selectedFilters={selectedFilters}
				handleAddToCart={handleAddToCart}
			/>
		</div>
	);
};

export default Home;
