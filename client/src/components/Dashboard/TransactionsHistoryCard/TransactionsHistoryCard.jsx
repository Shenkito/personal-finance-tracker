import { toast } from "react-hot-toast";

import useDeleteTransaction from "../../../hooks/useDeleteTransaction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";


const TransactionHistoryCard = ({ transactions }) => {

    const { deleteTransaction, loading } = useDeleteTransaction();

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
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-[200px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction History</h2>
            <div className="flex-1 overflow-auto"> {/* Ensure this div has the class */}
                {transactions.length > 0 ? (
                    <ul className="space-y-2">
                        {transactions.map((transaction, index) => (
                            <li key={index} className="text-sm text-gray-600 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{transaction.category}</p>
                                    <p>{transaction.description}</p>
                                    <p>${transaction.amount.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(transaction._id)}
                                    className="text-red-600 hover:text-red-800 font-bold ml-4"
                                    disabled={loading}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} className="text-lg p-2" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No transactions found</p>
                )}
            </div>
        </div>
    );
};

export default TransactionHistoryCard;
