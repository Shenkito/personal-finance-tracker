import useStore from "../store/useStore";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

const useBudgets = () => {

    const { budgets, setBudgets } = useStore();

    const [loading, setLoading] = useState(true);

    // Fetch transactions from the server
    const fetchBudgets = async () => {

        try {

            const response = await fetch("/api/budgets");
            const data = await response.json();

            setBudgets(data);
            setLoading(false);

        } catch (error) {

            toast.error(`Error fetching budgets: ${error.message}`);

        } finally {

            setLoading(false);

        }
    };

    // Recalculate `lastUpdated` whenever `transactions` state changes
    useEffect(() => {

        fetchBudgets();

    }, []);

    return { budgets, loading };
};

export default useBudgets;