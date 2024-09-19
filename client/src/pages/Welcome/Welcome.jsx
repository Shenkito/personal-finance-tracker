import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-blue-500 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform hover:scale-105 transition duration-300">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
                    Welcome to <br /> Personal Finance Tracker
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Manage your finances with ease and track your expenses.
                </p>
                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="block mb-4 bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="block bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
