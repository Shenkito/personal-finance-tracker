// src/hooks/useTransactions.js
import { useEffect, useState } from "react";
import useStore from "../store/useStore";

const useTransactions = () => {

    const { transactions, setTransactions } = useStore();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchTransactions();
    }, []);

    return { transactions, loading, error };
};

export default useTransactions;
