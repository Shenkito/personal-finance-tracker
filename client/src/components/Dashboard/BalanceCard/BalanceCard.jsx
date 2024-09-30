import useTransactions from "../../../hooks/useTransactions";
import { calculateBalance } from "../../../utils/calculateBalance";

const BalanceCard = () => {

    const { transactions, loading, error } = useTransactions();

    const balance = calculateBalance(transactions);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-2 text-gray-700 truncate">Balance</h2>
            <p className="text-xl font-bold text-green-600">${balance.toFixed(2)}</p>
        </div>
    )

}

export default BalanceCard;

