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
        <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center">Login</h2>
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-400">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="w-full p-2 mt-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full p-2 mt-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-gray-400 mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-purple-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
