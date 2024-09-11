import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { loading, signUp } = useSignUp();

    // const navigate = useNavigate();

    const handleChange = (e) => {

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });

    };

    const handleSignup = async (e) => {

        e.preventDefault();

        await signUp(inputs);

        // navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center">Sign Up</h2>
                <form onSubmit={handleSignup} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-400">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="w-full p-2 mt-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full p-2 mt-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 mt-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 mt-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full p-2 mt-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                <p className="text-gray-400 mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
