import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateTotalExpenses, calculateTotalIncome } from "../../../utils/calculateTotals";
import useTransactions from "../../../hooks/useTransactions";

const COLORS = ['#28a745', '#dc3545']; // Green for income, Red for expenses

const IncomeExpenseChart = () => {

    const { transactions, loading, error } = useTransactions();

    const totalIncome = calculateTotalIncome(transactions);
    const totalExpenses = calculateTotalExpenses(transactions);

    const data = [
        { name: 'Income', value: totalIncome },
        { name: 'Expenses', value: totalExpenses },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Income vs Expenses</h2>
            <div className="w-full h-64 sm:h-72 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="40%"
                            outerRadius="60%"
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IncomeExpenseChart;
