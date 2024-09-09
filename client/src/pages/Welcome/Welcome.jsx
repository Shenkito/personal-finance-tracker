import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to Your Personal Finance Tracker</h1>
            <div className="flex space-x-4">
                <Link to="/login" className="bg-purple-600 py-2 px-4 rounded hover:bg-purple-700 transition">
                    Login
                </Link>
                <Link to="/signup" className="bg-purple-600 py-2 px-4 rounded hover:bg-purple-700 transition">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
