import { calculateBalance } from "../../../utils/calculateBalance";
import { formatDate } from "../../../utils/formatDateLastUpdated"; // Import the utility function

const BalanceCard = ({ transactions, lastUpdated }) => {

    const balance = calculateBalance(transactions);
    const formattedDate = formatDate(lastUpdated); // Use the utility function to format the date

    // Conditional class based on balance value
    const balanceClass = balance >= 0 ? "text-green-600" : "text-red-600";

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between items-center h-[200px]">
            <div className="flex items-center justify-center mb-2">
                <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
            </div>

            {/* Display the balance with conditional text color */}
            <p className={`text-2xl font-bold ${balanceClass}`}>
                ${balance.toFixed(2)}
            </p>

            {/* Display last updated time */}
            <p className="text-xs text-gray-500 mt-2">
                {formattedDate}
            </p>
        </div>
    );
};

export default BalanceCard;
