// src/utils/getLatestTransaction.js

export const getLatestTransaction = (transactions) => {

    if (transactions.length === 0) return null; // Return null if there are no transactions

    return transactions.reduce((latest, transaction) => {
        return new Date(latest.createdAt) > new Date(transaction.createdAt) ? latest : transaction;
    });
};
