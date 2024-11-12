import ProfilePicture from "../../Main/ProfilePicture/ProfilePicture";
import NavLink from "../../Main/NavLink/NavLink";
import LogoutButton from "../../Main/LogoutButton/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faPiggyBank, faWallet, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../context/AuthContext";

const Sidebar = () => {
    const { authUser } = useAuthContext();

    const links = [
        { to: "/dashboard", icon: faTachometerAlt, label: "Dashboard" },
        { to: "/budgets", icon: faPiggyBank, label: "Budgets" },
        { to: "/expenses", icon: faWallet, label: "Expenses" },
    ];

    return (
        <div className="flex flex-col justify-between h-full p-4 lg:p-6 bg-gray-800 text-white border-r border-gray-700">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6">
                {/* Profile Picture */}
                <ProfilePicture className="w-16 h-16 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border-2 border-purple-500 object-cover" />

                {/* Username */}
                <span
                    className="mt-2 text-sm font-semibold text-gray-300 text-center truncate w-full max-w-[8rem] lg:max-w-full"
                    title={authUser?.username} // Tooltip for long usernames
                >
                    {authUser?.username}
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-4 flex flex-col items-center">
                {links.map((link) => (
                    <NavLink key={link.to} to={link.to} icon={link.icon}>
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="pt-4 border-t border-gray-700 flex flex-col items-center">
                <LogoutButton icon={faSignOutAlt} />
            </div>
        </div>
    );
};

export default Sidebar;
