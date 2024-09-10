import ProfilePicture from "../ProfilePicture/ProfilePicture";
import NavLink from "../NavLink/NavLink";
import LogoutButton from "../LogoutButton/LogoutButton";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <ProfilePicture />
            </div>
            <nav className="flex-1 p-4">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/budgets">Budgets</NavLink>
                <NavLink to="/expenses">Expenses</NavLink>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Sidebar;
