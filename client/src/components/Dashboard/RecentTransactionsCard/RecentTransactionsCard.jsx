import useTransactions from "../../../hooks/useTransactions";

const RecentTransactionsCard = () => {

    const { transactions, loading, error } = useTransactions();

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-2 text-gray-700 truncate">Recent Transactions</h2>
            <ul className="space-y-2 overflow-auto max-h-40">
                {transactions.map((transaction, index) => (
                    <li key={index} className="text-sm text-gray-600">
                        {transaction.description} - ${transaction.amount.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecentTransactionsCard;