import { calculateBudgetProgressBar } from "../../../utils/calculateBudgetCardProgress"; // Adjust path as necessary

const BudgetProgressBar = ({ spent, limit }) => {

    const { percentage, progressColor } = calculateBudgetProgressBar(spent, limit)

    const progressBarColor = {
        red: "bg-red-500",
        yellow: "bg-yellow-400",
        green: "bg-green-500",
    }[progressColor];
    
    return (
        <div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-lg h-3 mt-3">
                <div
                    className={`h-3 ${progressBarColor} rounded-lg transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{percentage.toFixed(1)}% Used</p>
        </div>
    )
}

export default BudgetProgressBar;