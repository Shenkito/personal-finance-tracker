import { useState } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck, faTimes, faPen } from "@fortawesome/free-solid-svg-icons";
import useDeleteTransaction from "../../../hooks/useDeleteTransaction";
import useEditTransaction from "../../../hooks/useEditTransaction";

const categories = [
    "Food", "Transport", "Entertainment", "Rent",
    "Utilities", "Health", "Shopping", "Salary", "Other"
];

const TransactionHistoryCard = ({ transactions }) => {

    const { deleteTransaction, loading: deleting } = useDeleteTransaction();

    const { editTransaction, loading: editing } = useEditTransaction();

    const [editingTransaction, setEditingTransaction] = useState(null);

    const [formData, setFormData] = useState({ amount: '', description: '', category: '', type: '' });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [errors, setErrors] = useState({
        amount: false,
        description: false,
        category: false,
        type: false,
    });


    // Unified handleFormChange function
    const handleFormChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({ ...prev, [name]: false }));

    };

    const handleEdit = (transaction) => {

        setEditingTransaction(transaction._id);

        setFormData({
            amount: transaction.amount,
            description: transaction.description,
            category: transaction.category,
            type: transaction.type,
        });

        setIsModalOpen(true);
    };

    const handleSave = async (id) => {

        const newErrors = {
            amount: !formData.amount || isNaN(formData.amount) || formData.amount <= 0,
            description: !formData.description,
            category: !formData.category,
            type: !formData.type,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            const fieldErrorMessages = {
                amount: "Amount should be greater than 0",
                description: "Description is required",
                category: "Category is required",
                type: "Type is required",
            };

            const fieldOrder = ["amount", "description", "category", "type"];

            const errorMessages = fieldOrder
                .filter((field) => newErrors[field])
                .map((field) => fieldErrorMessages[field]);

            toast.error(errorMessages.join("\n"));

            return;
        }

        const success = await editTransaction(id, formData);

        if (success) {

            setIsModalOpen(false);

            setEditingTransaction(null);

            setFormData({ amount: '', description: '', category: '', type: '' });

        }
    };

    const closeModal = () => {

        setIsModalOpen(false);

        setEditingTransaction(null);

        setFormData({ amount: '', description: '', category: '', type: '' });

        setErrors({ amount: false, description: false, category: false, type: false });

    };

    const handleDelete = (id) => {
        toast(
            (t) => (
                <div className="flex flex-col items-center text-center">
                    <p>Are you sure you want to delete this transaction?</p>
                    <div className="mt-2 flex gap-2 items-center">
                        <button
                            onClick={() => {
                                deleteTransaction(id);
                                toast.dismiss(t.id);
                            }}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faCheck} className="text-white" />
                        </button>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-gray-700" />
                        </button>
                    </div>
                </div>
            ),
            { duration: 5000 }
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-[200px] max-h-[200px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction History</h2>
            <div className="flex-1 overflow-y-auto">
                {transactions.length > 0 ? (
                    <ul className="space-y-2">
                        {transactions.map((transaction, index) => (
                            <li key={index} className="text-sm text-gray-600 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{transaction.category}</p>
                                    <p>{transaction.description}</p>
                                    <p>${transaction.amount.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleEdit(transaction)}
                                        className="text-blue-600 hover:text-blue-800 font-bold ml-4"
                                    >
                                        <FontAwesomeIcon icon={faPen} className="text-lg p-2" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(transaction._id)}
                                        className="text-red-600 hover:text-red-800 font-bold ml-4"
                                        disabled={deleting}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} className="text-lg p-2" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No transactions found</p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Edit Transaction</h3>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleFormChange}
                            placeholder="Amount"
                            className={`w-full p-2 mb-2 border ${errors.amount ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                        />
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                            placeholder="Description"
                            className={`w-full p-2 mb-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                        />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleFormChange}
                            className={`w-full p-2 mb-2 border ${errors.category ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                        >
                            <option value="" disabled hidden>Choose Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleFormChange}
                            className={`w-full p-2 mb-2 border ${errors.type ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                        >
                            <option value="" disabled hidden>Choose Type</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSave(editingTransaction)}
                                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                                disabled={editing}
                            >
                                {editing ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionHistoryCard;