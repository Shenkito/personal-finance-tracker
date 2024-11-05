import useTransactions from "../../hooks/useTransactions";
import BalanceCard from "../../components/Dashboard/BalanceCard/BalanceCard";
import TransactionHistoryCard from "../../components/Dashboard/TransactionsHistoryCard/TransactionsHistoryCard";
import RecentTransactionsCard from "../../components/Dashboard/RecentTransactionsCard/RecentTransactionsCard";
import BalanceBreakdownChart from "../../components/Dashboard/BalanceBreakdownChart/BalanceBreakdownChart";
import IncomeExpenseChart from "../../components/Dashboard/IncomeExpenseChart/IncomeExpenseChart";
import AddTransactionForm from "../../components/Dashboard/AddTransactionForm/AddTransactionFrom";
import LoadingSpinner from "../../components/Common/LoadingSpinner/LoadingSpinner";

const Dashboard = () => {
    const { transactions, loading, lastUpdated } = useTransactions();

    if (loading) return <LoadingSpinner />

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <BalanceCard transactions={transactions} lastUpdated={lastUpdated} />
                <TransactionHistoryCard transactions={transactions} />
                <RecentTransactionsCard transactions={transactions} />
            </div>

            {/* Flex container for the charts */}
            <div className="flex justify-between gap-6 mt-6">
                <div className="flex-1">
                    <BalanceBreakdownChart transactions={transactions} />
                </div>
                <div className="flex-1">
                    <IncomeExpenseChart transactions={transactions} />
                </div>
            </div>

            <AddTransactionForm />
        </div>
    );
};

export default Dashboard