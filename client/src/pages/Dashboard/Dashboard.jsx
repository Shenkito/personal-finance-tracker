// Dashboard.jsx
import React from "react";

const Dashboard = () => {
    // Sample data for charts
    const incomeData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Income',
                data: [400, 450, 300, 500, 450, 600],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const expenseData = {
        labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Other'],
        datasets: [
            {
                label: 'Expenses',
                data: [500, 200, 100, 150, 50],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
            },
        ],
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <header className="text-2xl font-bold text-white mb-4">
                Dashboard
            </header>

            {/* Stats Overview */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold">Total Income</h3>
                    <p className="text-xl">$3,000</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold">Total Expenses</h3>
                    <p className="text-xl">$1,200</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold">Remaining Budget</h3>
                    <p className="text-xl">$1,800</p>
                </div>
            </section>

            {/* Graphs/Charts (Commented out, add when charts are implemented) */}
            {/* <section className="space-y-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Income Over Time</h3>
                    <Line data={incomeData} />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
                    <Pie data={expenseData} />
                </div>
            </section> */}

            {/* Recent Transactions */}
            <section className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <ul className="space-y-2">
                    <li className="border-b border-gray-700 pb-2">Grocery Store - $50</li>
                    <li className="border-b border-gray-700 pb-2">Salary - $1,000</li>
                    <li className="border-b border-gray-700 pb-2">Rent - $500</li>
                </ul>
            </section>

            {/* Quick Actions */}
            <section className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex space-x-4">
                    <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Add Transaction</button>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Budget</button>
                </div>
            </section>
            <section className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex space-x-4">
                    <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Add Transaction</button>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Budget</button>
                </div>
            </section>
            <section className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex space-x-4">
                    <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Add Transaction</button>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Budget</button>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
