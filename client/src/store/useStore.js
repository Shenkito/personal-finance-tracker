// src/store/useStore.js
import create from "zustand";

const useStore = create((set) => ({
    transactions: [],
    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [...state.transactions, transaction],
        })),
    setTransactions: (transactions) => set({ transactions }),
}));

export default useStore;
