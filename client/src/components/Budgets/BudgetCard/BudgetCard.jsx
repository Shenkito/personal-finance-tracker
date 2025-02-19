import BudgetProgressBar from "../BudgetProgressBar/BudgetProgressBar";

const BudgetCard = ({ budgets }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => {

                return (
                    <div key={budget._id} className="border p-4 rounded-lg shadow bg-white">
                        <h2 className="text-xl font-semibold">{budget.category}</h2>
                        <p>Limit: ${budget.limit}</p>
                        <p>Spent: ${budget.spent}</p>
                        <p>
                            End Date:{" "}
                            {budget.endDate
                                ? new Date(budget.endDate).toLocaleDateString("en-GB")
                                : "No end date"}
                        </p>

                        <BudgetProgressBar spent={budget.spent} limit={budget.limit} />
                    </div>
                );
            })}
        </div>
    );
};

export default BudgetCard;
