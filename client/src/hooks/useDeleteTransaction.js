import { useState } from "react";

import useStore from "../store/useStore";

import toast from "react-hot-toast";

const useDeleteTransaction = () => {

    const [loading, setLoading] = useState(false);

    const { deleteCurrentTransaction } = useStore();

    const deleteTransaction = async (id) => {

        setLoading(true);

        try {

            const response = await fetch(`/api/transactions/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to delete transaction");

            await response.json();

            deleteCurrentTransaction(id);

            setLoading(false);

            toast.success("Transaction deleted successfully");

        } catch (error) {

            setLoading(false);

            toast.error(`Error: ${error.message}`);

            throw error;

        } finally {

            setLoading(false);

        }
    };

    return { deleteTransaction, loading }
}

export default useDeleteTransaction;