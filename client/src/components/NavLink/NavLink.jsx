import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => {
    return (
        <Link
            to={to}
            className="block py-3 px-6 rounded hover:bg-purple-600 hover:text-white transition duration-200 text-gray-400 text-lg font-medium"
        >
            {children}
        </Link>
    );
};

export default NavLink;
