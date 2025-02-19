export const calculateBudgetProgressBar = (spent, limit) => {

    const percentage = Math.min((spent / limit) * 100, 100); // Cap at 100%

    // Function to determine progress bar color
    const getProgressColor = () => {
        if (percentage >= 80) return "red";
        if (percentage >= 50) return "yellow";
        return "green";
    };

    return { percentage, progressColor: getProgressColor() }
};