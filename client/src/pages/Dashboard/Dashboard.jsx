import { useAuthContext } from "../../context/AuthContext";

const Dashboard = () => {

    const { authUser } = useAuthContext();

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-4">Welcome, {authUser?.username}</h1>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md">
                        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 truncate">Balance</h2>
                        <p className="text-sm sm:text-base md:text-lg font-semibold">$4,567.89</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md">
                        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 truncate">Upcoming Bills</h2>
                        <p className="text-sm sm:text-base md:text-lg">Rent, Utilities</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md">
                        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 truncate">Recent Transactions</h2>
                        <ul>
                            <li className="text-sm sm:text-base">Grocery - $50</li>
                            <li className="text-sm sm:text-base">Electricity - $75</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
