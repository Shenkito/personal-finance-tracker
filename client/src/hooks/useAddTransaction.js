import { useState } from "react";
import useStore from "../store/useStore";

import toast from "react-hot-toast";

const useAddTransaction = () => {

    const { transactions, setTransactions } = useStore();

    const [loading, setLoading] = useState(false);

    const addTransaction = async (newTransaction) => {

        const success = handleInputErrors(newTransaction);

        if (!success) return;

        try {

            setLoading(true);

            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTransaction),
            });

            if (!response.ok) {

                throw new Error("Failed to create transaction");

            }

            const createdTransaction = await response.json();

            // Update the transactions state by adding the new transaction
            setTransactions([...transactions, createdTransaction]);

        } catch (error) {

            toast.error(`Error creating transaction: ${error.message}`);

        } finally {

            setLoading(false);

        }
    };

    return { addTransaction, loading };
};

export default useAddTransaction;

function handleInputErrors({ amount, description }) {

    if (!amount || !description) {

        toast.error("Please fill in all required fields");

        return false;

    }

    if (amount <= 0) {
        
        toast.error("Amount should be greater than 0");

        return false;
    }

    return true;
}
