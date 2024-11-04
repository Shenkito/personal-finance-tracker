import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { calculateTotalExpenses, calculateTotalIncome } from "../../../utils/calculateTotals";

const COLORS = ['#28a745', '#dc3545']; // Green for income, Red for expenses

const IncomeExpenseChart = (transactions) => {  // Destructure transactions
    const totalIncome = calculateTotalIncome(transactions.transactions);
    const totalExpenses = calculateTotalExpenses(transactions.transactions);

    const data = [
        { name: 'Income', value: totalIncome },
        { name: 'Expenses', value: totalExpenses },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg h-80 flex flex-col"> {/* Flex column layout */}
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Income vs Expenses</h2>
            <div className="flex-1"> {/* Make this div flexible to occupy remaining space */}
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
                            label={({ value }) => `$${value.toFixed(2)}`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4"> {/* Add margin to space out the legend */}
                <div className="flex justify-around"> {/* Flex for even spacing */}
                    {data.map((entry, index) => (
                        <div key={index} className="flex items-center">
                            <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index], borderRadius: '50%' }} />
                            <span className="text-sm">{entry.name}</span> {/* Legend item */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IncomeExpenseChart;
