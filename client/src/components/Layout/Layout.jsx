import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-900">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
