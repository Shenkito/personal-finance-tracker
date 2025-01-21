import useBudgets from "../../hooks/useBudgets";
import LoadingSpinner from "../../components/Common/LoadingSpinner/LoadingSpinner";

const Budgets = () => {

    const { budgets, loading } = useBudgets();

    if (loading) return <LoadingSpinner />

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Budgets</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {budgets.map((budget) => (
                    <div key={budget._id} className="border p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{budget.category}</h2>
                        <p>Limit: ${budget.limit}</p>
                        <p>Spent: ${budget.spent}</p>
                        <p>
                            End Date:{" "}
                            {budget.endDate
                                ? new Date(budget.endDate).toLocaleDateString()
                                : "No end date"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Budgets;
