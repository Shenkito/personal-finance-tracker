import { useState } from "react";

import useStore from "../store/useStore";

import toast from "react-hot-toast";

const useEditTransaction = () => {

    const [loading, setLoading] = useState(false);

    const { updateTransaction } = useStore();

    const editTransaction = async (id, newTransaction) => {

        // const success = handleInputErrors(newTransaction);

        // if (!success) return;

        setLoading(true);

        try {

            const response = await fetch(`/api/transactions/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTransaction),
            });

            if (!response.ok) {

                throw new Error("Failed to edit transaction");
                
            }

            const data = await response.json();

            if (data.error) {

                throw new Error(data.error);

            };

            updateTransaction(data);

            setLoading(false);

            return data;

        } catch (error) {

            toast.error(error.message);

            throw error;

        } finally {

            setLoading(false)

        }
    };

    return { editTransaction, loading }
};

export default useEditTransaction;

// function handleInputErrors({ amount, description }) {

//     if (!amount || !description) {

//         toast.error("Please fill in all required fields");

//         return false;

//     }

//     if (amount <= 0) {
        
//         toast.error("Amount should be greater than 0");

//         return false;
//     }

//     return true;
// }