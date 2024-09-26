export const calculateTotalIncome = (transactions) => {
    return transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
};

export const calculateTotalExpenses = (transactions) => {
    return transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);
};