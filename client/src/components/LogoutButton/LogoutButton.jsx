import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
    const { setAuthUser } = useAuthContext();

    const handleLogout = () => {
        // Clear user data and log out
        setAuthUser(null);
        localStorage.removeItem("current-user");
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
