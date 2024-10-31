import { useState } from "react";

import { toast } from "react-hot-toast";

import useDeleteTransaction from "../../../hooks/useDeleteTransaction";
import useEditTransaction from "../../../hooks/useEditTransaction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck, faTimes, faPen } from "@fortawesome/free-solid-svg-icons";

// Define categories to match AddTransactionForm
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

const TransactionHistoryCard = ({ transactions }) => {

    const { deleteTransaction, loading: deleting } = useDeleteTransaction();
    const { editTransaction, loading: editing } = useEditTransaction();

    const [editingTransaction, setEditingTransaction] = useState(null);
    const [formData, setFormData] = useState({ amount: '', description: '', category: '', type: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        const success = await editTransaction(id, formData);
        if (success) {
            setIsModalOpen(false);
            setEditingTransaction(null);
            setFormData({ amount: '', description: '', category: '', type: '' });
        }
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

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
        setFormData({ amount: '', description: '', category: '', type: '' });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-[200px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction History</h2>
            <div className="flex-1 overflow-auto">
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

            {/* Modal for Editing Transaction */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Edit Transaction</h3>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="Amount"
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Description"
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="border p-2 rounded mb-2 w-full"
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="border p-2 rounded mb-2 w-full"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleSave(editingTransaction)}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                disabled={editing}
                            >
                                Save
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionHistoryCard;
