import useLogout from "../../../hooks/useLogout";

const LogoutButton = () => {
    const { loading, logout } = useLogout();

    return (
        <button
            onClick={logout}
            disabled={loading}
            className={`w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200 flex items-center justify-center font-semibold text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {loading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                'Logout'
            )}
        </button>
    );
};

export default LogoutButton;
