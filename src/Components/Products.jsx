const Products = ({ allProducts }) => {
	return (
		<>
			{allProducts.length == 0 ? (
				<h1 className="text-center text-3xl font-serif font-bold mt-20">
					No items available!
				</h1>
			) : (
				<div className="font-serif">
					<h1 className="text-center text-3xl font-serif font-bold my-8">
						Our Exclusive Products !
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
						{allProducts.map((product) => (
							<div
								key={product.id}
								className="card lg:w-80 shadow-xl border-2 border-black shadow-white"
							>
								<figure>
									<img
										className="w-80 h-48"
										src={product.thumbnail}
										alt="Shoes"
									/>
								</figure>
								<p className="absolute top-2 right-5 bg-black px-3 py-1 rounded-md">
									${product.price}
								</p>
								<div className="card-body">
									<h2 className="card-title">{product.title}</h2>
									<p>{product.description.slice(0, 50)}....</p>
									<p>
										Brand :<span className="text-white"> {product.brand}</span>
									</p>
									<div className="card-actions justify-end">
										<button className="btn btn-primary">Add to Cart</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Products;
