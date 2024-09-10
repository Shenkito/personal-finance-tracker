import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => {
    return (
        <Link
            to={to}
            className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
            {children}
        </Link>
    );
};

export default NavLink;
