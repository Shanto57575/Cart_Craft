const Products = ({ allProducts, handleFilteredPrice, selectedFilters }) => {
	const filterRanges = [
		{ label: "< $100", value: "10-100" },
		{ label: "$100 - $500", value: "100-500" },
		{ label: "$500 - $1000", value: "500-1000" },
		{ label: "$1000 - $1500", value: "1000-1500" },
		{ label: "$1500 - $2000", value: "1500-2000" },
	];

	return (
		<>
			{allProducts.length == 0 ? (
				<h1 className="text-center text-3xl font-serif font-bold mt-20">
					No items available!
				</h1>
			) : (
				<div className="font-serif">
					<h1 className="text-center text-3xl font-serif font-bold my-8">
						Our Exclusive Products!
					</h1>
					<div className="flex justify-between">
						<div className="w-[20%]">
							<h1>Filter : </h1>
							<div className="">
								{filterRanges.map((filter) => (
									<div key={filter.value} className="flex items-center">
										<input
											className="w-5 h-5 mr-2 cursor-pointer"
											type="checkbox"
											value="$10 - $100"
											onChange={() => handleFilteredPrice(filter.value)}
											checked={selectedFilters.includes(filter.value)}
										/>
										<label htmlFor={filter.value}>{filter.label}</label>
									</div>
								))}
							</div>
						</div>
						<div className="w-[80%] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
							{allProducts.map((product) => (
								<div
									key={product.id}
									className="card lg:w-80 shadow-xl border-2 border-black shadow-white"
								>
									<figure>
										<img
											className="w-80 h-48"
											src={product.thumbnail}
											alt={product.title}
										/>
									</figure>
									<p className="absolute top-2 right-5 bg-black px-3 py-1 rounded-md">
										${product.price}
									</p>
									<div className="card-body">
										<h2 className="card-title">{product.title}</h2>
										<p>{product.description.slice(0, 50)}....</p>
										<p>
											Brand :
											<span className="text-white"> {product.brand}</span>
										</p>
										<div className="card-actions justify-end">
											<button className="btn btn-primary">Add to Cart</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Products;
