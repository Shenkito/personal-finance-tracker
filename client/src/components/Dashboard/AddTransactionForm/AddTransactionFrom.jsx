import { useState } from "react";
import useAddTransaction from "../../../hooks/useAddTransaction";
import toast from "react-hot-toast";

const categories = [
    "Food", "Transport", "Entertainment", "Rent",
    "Utilities", "Health", "Shopping", "Salary", "Other"
];

const AddTransactionForm = () => {

    const { addTransaction, loading: addingTransaction } = useAddTransaction();

    const [newTransaction, setNewTransaction] = useState({
        amount: "",
        description: "",
        category: "",
        type: ""
    });

    const [errors, setErrors] = useState({
        amount: false,
        description: false,
        category: false,
        type: false,
    });

    const handleFormChange = (e) => {

        const { name, value } = e.target;

        setNewTransaction((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({ ...prev, [name]: false }));

    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        const newErrors = {
            amount: !newTransaction.amount || isNaN(newTransaction.amount) || newTransaction.amount <= 0,
            description: !newTransaction.description,
            category: !newTransaction.category,
            type: !newTransaction.type,
        }

        setErrors(newErrors);

        // if (isNaN(newTransaction.amount)) {

        //     return alert("Please enter a valid number for the amount.");

        // }
        if (Object.values(newErrors).some((error) => error)) {
            const fieldErrorMessages = {
                amount: "Amount should be greater than 0",
                description: "Description is required",
                category: "Category is required",
                type: "Type is required",
            };

            // Define the desired field order
            const fieldOrder = ["amount", "description", "category", "type"];

            // Collect all errors in the correct order
            const errorMessages = fieldOrder
                .filter((field) => newErrors[field]) // Filter fields with errors
                .map((field) => fieldErrorMessages[field]); // Map to error messages

            // Show all error messages in a single toast
            if (errorMessages.length > 0) {

                toast.error(errorMessages.join("\n")); // Use line breaks to separate messages

            }

            return;
        }

        const success = await addTransaction({

            amount: parseFloat(newTransaction.amount),
            description: newTransaction.description,
            category: newTransaction.category,
            type: newTransaction.type

        });

        if (success) {

            setNewTransaction({

                amount: "",
                description: "",
                category: "",
                type: ""

            });

        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-md mx-auto lg:max-w-lg xl:max-w-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center md:text-left">Add Transaction</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleFormChange}
                    placeholder="Amount"
                    className={`w-full p-3 border ${errors.amount ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                />
                <input
                    type="text"
                    name="description"
                    value={newTransaction.description}
                    onChange={handleFormChange}
                    placeholder="Description"
                    className={`w-full p-3 border ${errors.description ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                />
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <select
                        name="category"
                        value={newTransaction.category}
                        onChange={handleFormChange}
                        className={`w-full p-3 border ${errors.category ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                    >
                        <option value="" disabled hidden>Choose Category</option>
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
                        className={`w-full p-3 border ${errors.type ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                    >
                        <option value="" disabled hidden>Choose Type</option>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={addingTransaction}
                >
                    {addingTransaction ? "Adding Transaction..." : "Add Transaction"}
                </button>
            </form>
        </div>
    );
};

export default AddTransactionForm;
