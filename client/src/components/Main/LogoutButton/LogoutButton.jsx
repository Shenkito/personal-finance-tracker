import useLogout from "../../../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogoutButton = ({ icon }) => {
    const { loading, logout } = useLogout();

    return (
        <button
            onClick={logout}
            disabled={loading}
            className="w-full flex items-center justify-center lg:justify-start py-3 px-4 bg-red-600 rounded-lg hover:bg-red-700 text-white font-semibold text-lg transition-all duration-200"
        >
            <FontAwesomeIcon icon={icon} className="text-xl" />
            <span className="ml-3 hidden lg:inline">
                {loading ? "Logging out..." : "Logout"}
            </span>
        </button>
    );
};

export default LogoutButton;
