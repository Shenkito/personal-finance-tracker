import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { calculateTotalExpenses, calculateTotalIncome } from "../../../utils/calculateTotals";

const COLORS = ['#28a745', '#dc3545']; // Green for income, Red for expenses

const IncomeExpenseChart = ({ transactions }) => {  // Destructure props for readability

    const totalIncome = calculateTotalIncome(transactions);

    const totalExpenses = calculateTotalExpenses(transactions);

    const data = [

        { name: 'Income', value: totalIncome },
        { name: 'Expenses', value: totalExpenses },

    ];

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg h-[250px] md:h-80 flex flex-col">
            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-gray-700">Income vs Expenses</h2>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="35%"
                            outerRadius="55%"
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
            <div className="mt-2 md:mt-4">
                <div className="flex justify-around">
                    {data.map((entry, index) => (
                        <div key={index} className="flex items-center">
                            <div className="w-3 h-3 md:w-4 md:h-4 mr-2" style={{ backgroundColor: COLORS[index], borderRadius: '50%' }} />
                            <span className="text-xs md:text-sm">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IncomeExpenseChart;
