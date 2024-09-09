// SideBar.jsx
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="bg-gray-900 w-full md:w-64 fixed top-0 left-0 h-full md:h-screen p-4 text-white flex flex-col">
            <div className="flex flex-col items-center mb-6">
                <img
                    src="/path/to/profile-pic.jpg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full mb-4"
                />
                <h2 className="text-lg font-semibold">John Doe</h2>
            </div>

            <nav className="flex flex-col space-y-2 flex-grow">
                <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded transition-transform transform hover:scale-105"
                >
                    <span>Dashboard</span>
                </Link>
                {/* Add other links here */}
            </nav>

            <div className="mt-auto">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-transform transform hover:scale-105">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SideBar;
