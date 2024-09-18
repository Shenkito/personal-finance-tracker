// src/hooks/useAddTransaction.js
import { useEffect, useState } from "react";
import useStore from "../store/useStore";

const useAddTransaction = () => {

    const { addTransaction } = useStore();

    const [loading, setLoading] = useState(false);

    const add = async (newTransaction) => {

        try {
            setLoading(true);

            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTransaction),
            });

            if (!response.ok) throw new Error("Failed to create transaction");

            const createdTransaction = await response.json();

            addTransaction(createdTransaction);

        } catch (error) {

            console.error("Error creating transaction:", error);

        } finally {

            setLoading(false);

        }
    };

    return { addTransaction: add, loading };
};

export default useAddTransaction;
