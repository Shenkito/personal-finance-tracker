// src/store/useStore.js
import create from "zustand";

const useStore = create((set) => ({
    transactions: [],
    budgets: [],
    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [...state.transactions, transaction],
        })),
    setTransactions: (transactions) => set({ transactions }),
    deleteCurrentTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((transaction) => transaction._id !== id)
    })),
    updateTransaction: (updatedTransaction) => set((state) => ({
        transactions: state.transactions.map((transaction) =>
            transaction._id === updatedTransaction._id ? updatedTransaction : transaction
        ),
    })),
    addBudget: (budget) =>
        set((state) => ({
            budgets: [...state.budgets, budget]
        })),
    setBudgets: (budgets) => set({ budgets }),
}));

export default useStore;
