// src/store/useStore.js
import create from "zustand";

const useStore = create((set) => ({
    transactions: [],
    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [...state.transactions, transaction],
        })),
    setTransactions: (transactions) => set({ transactions }),
    deleteCurrentTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((transaction) => transaction._id !== id)
    })),
}));

export default useStore;
