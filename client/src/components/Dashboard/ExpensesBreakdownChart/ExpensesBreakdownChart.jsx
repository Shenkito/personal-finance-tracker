import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpensesBreakdownChart = (transactions) => {  // Destructure transactions
    const expenseData = transactions.transactions.map((transaction) => ({
        name: transaction.category, // category name
        value: transaction.amount,
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg h-80"> {/* Increased height */}
            <h2 className="text-lg font-semibold mb-2 text-gray-700 truncate">Expenses Breakdown</h2>
            <ResponsiveContainer width="100%" height="100%">
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
                    <Tooltip
                        formatter={(value, name) => [`$${value.toFixed(2)}`, name]} // Show category name
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpensesBreakdownChart;
