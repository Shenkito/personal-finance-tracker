// Function to calculate balance
export const calculateBalance = (transactions) => {
    console.log(transactions);

    return transactions.reduce((acc, transaction) => {
        return transaction.type === "income"
            ? acc + transaction.amount
            : acc - transaction.amount;
    }, 0);
};
