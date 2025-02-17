import { useState } from "react";
import useStore from "../store/useStore";
import toast from "react-hot-toast";

const useAddBudget = () => {

    const { budgets, setBudgets } = useStore();

    const [loading, setLoading] = useState(false);

    const addBudget = async (newBudget) => {

        try {

            setLoading(true);

            const response = await fetch("/api/budgets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBudget),
            });

            if (!response.ok) {

                throw new Error("Failed to create budget");

            }

            const createdBudget = await response.json();

            setBudgets([...budgets, createdBudget]);

            toast.success("Budget added successfully");

            return true;

        } catch (error) {

            toast.error(`Error creating budget: ${error.message}`);

        } finally {

            setLoading(false);

        }
    };

    return { addBudget, loading };

};

export default useAddBudget;