import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("https://dummyjson.com/auth/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					username: userName,
					password: password,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("token", data.token);
				navigate("/");
			} else {
				console.error("Login Failed");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage:
						"url(https://t3.ftcdn.net/jpg/06/39/59/06/240_F_639590634_DznOAjfGBBRJWCa1TPc8AB7yXGTwLQwk.jpg)",
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Login Here</h1>
						<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
							<form className="card-body text-black">
								<div className="form-control">
									<label className="label">
										<span className="label-text">User Name</span>
									</label>
									<input
										type="text"
										placeholder="UserName"
										className="input input-bordered"
										value={userName}
										onChange={(e) => setUserName(e.target.value)}
										required
									/>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Password</span>
									</label>
									<input
										type="password"
										placeholder="password"
										className="input input-bordered"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<div className="form-control mt-6">
									<button onClick={handleLogin} className="btn btn-primary">
										Login
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
