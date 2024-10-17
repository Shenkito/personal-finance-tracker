import { useState } from "react";
import useStore from "../store/useStore";

const useAddTransaction = () => {

    const { transactions, setTransactions } = useStore();

    const [loading, setLoading] = useState(false);

    const addTransaction = async (newTransaction) => {

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

            console.error("Error creating transaction:", error);

        } finally {

            setLoading(false);

        }
    };

    return { addTransaction, loading };
};

export default useAddTransaction;
