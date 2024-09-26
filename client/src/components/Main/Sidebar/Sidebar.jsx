import ProfilePicture from "../../Main/ProfilePicture/ProfilePicture";
import NavLink from "../../Main/NavLink/NavLink";
import LogoutButton from "../../Main/LogoutButton/LogoutButton";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col justify-between min-h-screen shadow-lg">
            <div className="p-6 border-b border-gray-700">
                <ProfilePicture />
            </div>
            <nav className="flex-1 p-6 space-y-4">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/budgets">Budgets</NavLink>
                <NavLink to="/expenses">Expenses</NavLink>
            </nav>
            <div className="p-6 border-t border-gray-700">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Sidebar;
