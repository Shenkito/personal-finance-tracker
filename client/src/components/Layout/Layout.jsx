// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

const Layout = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <SideBar />
            <main className="flex-1 p-4 bg-gray-850 ml-0 md:ml-64 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
