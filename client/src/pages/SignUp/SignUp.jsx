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

    const [file, setFile] = useState(null); // State to hold the uploaded file

    const { loading, signUp } = useSignUp();

    // const navigate = useNavigate();

    const handleChange = (e) => {

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });

    };

    const handleFileChange = (e) => {

        setFile(e.target.files[0]); // Set the selected file
        
    };

    const handleSignup = async (e) => {

        e.preventDefault();

        await signUp(inputs, file);

        // navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-blue-500 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform hover:scale-105 transition duration-300">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Create an Account
                </h2>
                <form onSubmit={handleSignup} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter Full Name"
                            className="w-full p-3 mt-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            className="w-full p-3 mt-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            className="w-full p-3 mt-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-full p-3 mt-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full p-3 mt-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold">Profile Picture</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-3 mt-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                <p className="text-gray-500 mt-6 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;