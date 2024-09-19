import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin"; // Assuming you have a custom hook for login

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    // const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        await login(username, password);

        // navigate('/'); // Navigate to the dashboard after successful login

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-blue-500 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform hover:scale-105 transition duration-300">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Welcome Back!
                </h2>
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="w-full p-3 mt-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-semibold">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full p-3 mt-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-gray-500 mt-6 text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-purple-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
