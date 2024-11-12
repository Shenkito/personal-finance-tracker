import { Outlet } from "react-router-dom";
import Sidebar from "../../Main/Sidebar/Sidebar";

const Layout = () => {
    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar (always visible) */}
            <div className="w-16 sm:w-20 lg:w-64">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
