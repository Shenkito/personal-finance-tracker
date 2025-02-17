import useBudgets from "../../hooks/useBudgets";
import LoadingSpinner from "../../components/Common/LoadingSpinner/LoadingSpinner";

import BudgetCard from "../../components/Budgets/BudgetCard/BudgetCard";
import AddBudgetForm from "../../components/Budgets/AddBudgetForm/AddBudgetForm";

const Budgets = () => {

    const { budgets, loading } = useBudgets();

    if (loading) return <LoadingSpinner />

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Budgets</h1>

            <div className="">
                <BudgetCard budgets={budgets} />
                <AddBudgetForm />
            </div>
        </div>
    )


}

export default Budgets;