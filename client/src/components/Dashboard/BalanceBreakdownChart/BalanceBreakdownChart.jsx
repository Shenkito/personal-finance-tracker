import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { generateRandomColor } from "../../../utils/generateRandomColor"; // Adjust path as necessary

const BalanceBreakdownChart = ({ transactions }) => {

    // Prepare data for the chart with generated colors
    const expenseData = transactions.map((transaction) => ({

        ...transaction,
        color: generateRandomColor(transaction._id), // Use a unique property

    }));

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg h-60 md:h-80">
            <h2 className="text-base md:text-lg font-semibold mb-2 text-gray-700 truncate text-center md:text-left">
                Balance Breakdown
            </h2>
            <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={expenseData}
                            dataKey="amount" // Ensure this matches your transaction property
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius="80%" // Make radius responsive
                        >
                            {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color || '#000000'} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => {
                                const categoryData = expenseData.find(entry => entry.category === name);
                                const type = categoryData ? (categoryData.type === 'income' ? 'Income' : 'Expense') : 'Unknown';
                                return [`$${value.toFixed(2)}`, `${categoryData?.category || 'Unknown'} (${type})`];
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BalanceBreakdownChart;
