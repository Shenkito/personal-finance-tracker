// Container.jsx
import React from "react";

const Container = ({ children }) => (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
            {children}
        </div>
    </div>
);

export default Container;
