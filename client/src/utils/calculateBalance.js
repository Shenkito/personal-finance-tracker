// Function to calculate balance
export const calculateBalance = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        return transaction.type === "income"
            ? acc + transaction.amount
            : acc - transaction.amount;
    }, 0);
};
