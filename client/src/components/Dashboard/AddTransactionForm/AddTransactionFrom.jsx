import { useState } from "react";
import useAddTransaction from "../../../hooks/useAddTransaction";

const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Rent",
    "Utilities",
    "Health",
    "Shopping",
    "Salary",
    "Other"
];

const AddTransactionForm = () => {

    const { addTransaction, loading: addingTransaction } = useAddTransaction();

    const [newTransaction, setNewTransaction] = useState({
        amount: "",
        description: "",
        category: "Food",
        type: "expense"
    });

    const handleFormChange = (e) => {

        const { name, value } = e.target;

        setNewTransaction((prev) => ({ ...prev, [name]: value }));

    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (isNaN(newTransaction.amount)) {

            return alert("Please enter a valid number for the amount.");

        }

        await addTransaction({
            amount: parseFloat(newTransaction.amount),
            description: newTransaction.description,
            category: newTransaction.category,
            type: newTransaction.type
        });

        setNewTransaction({
            amount: "",
            description: "",
            category: "Food",
            type: "expense"
        });

    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Add Transaction</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleFormChange}
                    placeholder="Amount"
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newTransaction.description}
                    onChange={handleFormChange}
                    placeholder="Description"
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    required
                />
                <select
                    name="category"
                    value={newTransaction.category}
                    onChange={handleFormChange}
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    required
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                    name="type"
                    value={newTransaction.type}
                    onChange={handleFormChange}
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    required
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    disabled={addingTransaction}
                >
                    {addingTransaction ? "Adding Transaction..." : "Add Transaction"}
                </button>
            </form>
        </div>
    )
}

export default AddTransactionForm;