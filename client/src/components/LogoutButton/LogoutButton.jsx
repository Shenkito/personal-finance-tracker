import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {

    const { loading, logout } = useLogout();

    return (
        <button
            onClick={logout}
            disabled={loading} // Disable button when loading
            className={`w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {loading ? (
                <span className="loading loading-spinner"></span> // Show spinner while loading
            ) : (
                'Logout' // Show 'Logout' text when not loading
            )}
        </button>
    );
};

export default LogoutButton;
