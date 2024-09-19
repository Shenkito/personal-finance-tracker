import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { calculateBalance } from "../../utils/calculateBalance";
import useTransactions from "../../hooks/useTransactions";
import useAddTransaction from "../../hooks/useAddTransaction";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {

    const { transactions, loading, error } = useTransactions();
    const { addTransaction, loading: addingTransaction } = useAddTransaction();

    const [newTransaction, setNewTransaction] = useState({
        amount: "",
        description: "",
        category: "",
        type: "expense"
    });

    const balance = calculateBalance(transactions);

    const handleFormChange = (e) => {

        const { name, value } = e.target;
        setNewTransaction((prev) => ({ ...prev, [name]: value }));

    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (isNaN(newTransaction.amount)) {

            return alert("Please enter a valid number for the amount.");

        }

        await addTransaction({
            amount: parseFloat(newTransaction.amount),
            description: newTransaction.description,
            category: newTransaction.category,
            type: newTransaction.type
        });

        setNewTransaction({
            amount: "",
            description: "",
            category: "",
            type: "expense"
        });
    };

    // Sample data for the Pie Chart
    const expenseData = transactions.map((transaction) => ({
        name: transaction.category,
        value: transaction.amount,
    }));

    if (loading) return <p className="text-gray-600">Loading transactions...</p>;
    if (error) return <p className="text-red-500">Error fetching transactions: {error}</p>;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700 truncate">Balance</h2>
                    <p className="text-xl font-bold text-green-600">${balance.toFixed(2)}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700 truncate">Upcoming Bills</h2>
                    <p className="text-sm text-gray-500">Rent, Utilities</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700 truncate">Recent Transactions</h2>
                    <ul className="space-y-2">
                        {transactions.map((transaction, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                {transaction.description} - ${transaction.amount.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700 truncate">Expenses Breakdown</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={expenseData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                            >
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Add Transaction</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="number"
                        name="amount"
                        value={newTransaction.amount}
                        onChange={handleFormChange}
                        placeholder="Amount"
                        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        value={newTransaction.description}
                        onChange={handleFormChange}
                        placeholder="Description"
                        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={newTransaction.category}
                        onChange={handleFormChange}
                        placeholder="Category"
                        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        required
                    />
                    <select
                        name="type"
                        value={newTransaction.type}
                        onChange={handleFormChange}
                        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        required
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                        disabled={addingTransaction}
                    >
                        {addingTransaction ? "Adding Transaction..." : "Add Transaction"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
