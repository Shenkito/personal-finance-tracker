import { useState } from "react";
import useAddBudget from "../../../hooks/useAddBudget";
import toast from "react-hot-toast";

const categories = [
    "Food", "Transport", "Entertainment", "Rent",
    "Utilities", "Health", "Shopping", "Salary", "Other"
];

const AddBudgetForm = () => {

    const { addBudget, loading: addingBudget } = useAddBudget();

    const [newBudget, setNewBudget] = useState({
        category: "",
        limit: "",
        endDate: ""
    });

    const [errors, setErrors] = useState({
        category: false,
        limit: false,
        endDate: false,
    });

    const handleFormChange = (e) => {

        const { name, value } = e.target;

        setNewBudget((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({ ...prev, [name]: false }));

    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        const newErrors = {
            category: !newBudget.category,
            limit: !newBudget.limit || isNaN(newBudget.limit) || newBudget.limit <= 0,
            //todo endDate
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            const fieldErrorMessages = {
                category: "Category is required",
                limit: "Limit should be greater than 0",
                //todo endDate
            }

            const fieldOrder = ["category", "limit"];

            const errorMessages = fieldOrder
                .filter((field) => newErrors[field])
                .map((field) => fieldErrorMessages[field]);

            if (errorMessages.length > 0) {

                toast.error(errorMessages.join("\n"));
            }

            return;
        }

        const success = await addBudget({

            category: newBudget.category,
            limit: parseFloat(newBudget.limit),
            endDate: newBudget.endDate

        });

        if (success) {

            setNewBudget({
                category: "",
                limit: "",
                endDate: ""
            });

        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-md mx-auto lg:max-w-lg xl:max-w-2xl">
            <h2 className="text-lg fond-semibold mb-4 text-gray-700 text-center md:text-left">Add Budget</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <select
                        name="category"
                        value={newBudget.category}
                        onChange={handleFormChange}
                        className={`w-full p-3 border ${errors.category ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring focus-ring-blue-200 focus:outline-none`}
                    >
                        <option value="" disabled hidden>Choose Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="limit"
                        value={newBudget.limit}
                        onChange={handleFormChange}
                        placeholder="Limit"
                        className={`w-full p-3 border ${errors.limit ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                    />
                </div>
                {/* Date Picker for End Date */}
                <div>
                    <label htmlFor="endDate" className="block text-gray-700 font-medium">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={newBudget.endDate.split("/").reverse().join("/")}
                        onChange={handleFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={addingBudget}
                >
                    {addingBudget ? "Adding Budget..." : "Add Budget"}
                </button>
            </form>
        </div>
    )
}

export default AddBudgetForm