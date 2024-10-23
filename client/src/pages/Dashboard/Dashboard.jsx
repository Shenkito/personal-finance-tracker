import useTransactions from "../../hooks/useTransactions";
import BalanceCard from "../../components/Dashboard/BalanceCard/BalanceCard";
import UpcomingBillsCard from "../../components/Dashboard/UpcomingBillsCard/UpcomingBillsCard";
import RecentTransactionsCard from "../../components/Dashboard/RecentTransactionsCard/RecentTransactionsCard";
import ExpensesBreakdownChart from "../../components/Dashboard/ExpensesBreakdownChart/ExpensesBreakdownChart";
import IncomeExpenseChart from "../../components/Dashboard/IncomeExpenseChart/IncomeExpenseChart";
import AddTransactionForm from "../../components/Dashboard/AddTransactionForm/AddTransactionFrom";
import LoadingSpinner from "../../components/Common/LoadingSpinner/LoadingSpinner";

const Dashboard = () => {

    const { transactions, loading, error, lastUpdated } = useTransactions();

    if (loading) {

        return <LoadingSpinner />

    }

    if (error) return <p className="text-red-500">Error fetching transactions: {error}</p>;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <BalanceCard transactions={transactions} lastUpdated={lastUpdated} />
                <UpcomingBillsCard />
                <RecentTransactionsCard transactions={transactions} />
                <ExpensesBreakdownChart transactions={transactions} />
                <IncomeExpenseChart transactions={transactions} />
            </div>

            <AddTransactionForm />
        </div>
    );
};

export default Dashboard;
