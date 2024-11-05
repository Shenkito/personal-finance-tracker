const RecentTransactionsCard = ({ transactions }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-[200px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h2>
            <div className="flex-1 overflow-auto">
                {transactions.length > 0 ? (

                    <ul className="space-y-2">
                        {transactions.map((transaction, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                <p className="font-semibold">{transaction.category}</p>
                                {transaction.description} - ${transaction.amount.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No transactions found</p>
                )}
            </div>
        </div>
    );
};

export default RecentTransactionsCard;
