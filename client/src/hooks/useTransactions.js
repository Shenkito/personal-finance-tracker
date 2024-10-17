import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { getLatestTransaction } from "../utils/getLatestTransactions"; // Import the utility function

const useTransactions = () => {

    const { transactions, setTransactions } = useStore();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch transactions from the server
    const fetchTransactions = async () => {

        try {

            const response = await fetch("/api/transactions");
            const data = await response.json();

            setTransactions(data);
            setLoading(false);

        } catch (err) {

            setError(err.message);
            setLoading(false);

        }
    };

    // Recalculate `lastUpdated` whenever `transactions` state changes
    useEffect(() => {

        fetchTransactions();

    }, []);

    // Dynamically calculate the last updated date from the transactions
    const lastUpdated = transactions.length > 0 ? getLatestTransaction(transactions)?.createdAt : null;

    return { transactions, loading, error, lastUpdated };
};

export default useTransactions;
