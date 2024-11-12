import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLink = ({ to, icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center justify-center lg:justify-start py-3 px-4 w-full text-lg font-medium rounded-lg transition-all duration-200 
                ${isActive ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-purple-600 hover:text-white'}`}
        >
            <FontAwesomeIcon icon={icon} className="text-xl" />
            <span className="ml-3 hidden lg:inline">{children}</span>
        </Link>
    );
};

export default NavLink;
