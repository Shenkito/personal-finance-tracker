export const calculateSpentFromExistingTransactions = (transactions) => {

    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

};