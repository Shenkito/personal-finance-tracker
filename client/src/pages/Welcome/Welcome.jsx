import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-white text-center">Welcome to Personal Finance Tracker</h1>
                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="block mb-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="block bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
