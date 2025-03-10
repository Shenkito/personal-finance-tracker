import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import Budget from "../models/budgetModel.js";

export const createTransaction = async (req, res) => {

    try {

        const { amount, description, category, type } = req.body;

        // Ensure all required fields are provided
        if (!amount || !description || !category || !type) {

            return res.status(400).json({ error: "All fields are required" });

        }

        // Ensure amount is a number
        if (isNaN(amount)) {

            return res.status(400).json({ error: "Amount must be a number" });

        }

        // Create and save the new transaction
        const newTransaction = new Transaction({
            amount,
            description,
            category,
            type,
            user: req.user._id // Associate transaction with the user
        });

        await newTransaction.save();

        if (type === "expense") {

            const budget = await Budget.findOne({
                user: req.user._id,
                category: category,
            });

            if (budget) {
                budget.spent += amount;
                await budget.save();
            }
        }

        // Update the user's transactions array
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { transactions: newTransaction._id } }, // Push the transaction ID to the user's transactions array
            { new: true } // Return the updated document
        );

        // Respond with the created transaction
        res.status(201).json(newTransaction);

    } catch (error) {

        console.error("Error creating transaction:", error.message);
        res.status(500).json({ error: "Internal server error" });

    }
};

export const getTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find({ user: req.user._id });

        res.status(200).json(transactions);

    } catch (error) {

        console.log("Error in getTransactions controller", error.message);

        res.status(500).json({ error: "Internal Server Error" });

    }
};

export const editTransaction = async (req, res) => {

    const { id } = req.params;

    const existingTransaction = await Transaction.findById(id)

    const { amount, description, category, type } = req.body;

    // Ensure all required fields are provided
    if (!amount || !description || !category || !type) {

        return res.status(400).json({ error: "All fields are required" });

    }

    // Ensure amount is a number
    if (isNaN(amount)) {

        return res.status(400).json({ error: "Amount must be a number" });

    }

    try {

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { amount, description, category, type }, // Use the correct fields
            { new: true }
        );

        if (!updatedTransaction) {

            return res.status(404).json({ message: "Transaction not found" });

        }

        // Check if the transaction type is "expense" or "income"
        if (existingTransaction.type === "expense" && updatedTransaction.type === "income") {
            // Find the old budget and subtract the transaction amount since it's no longer an expense
            const oldBudget = await Budget.findOne({
                user: req.user._id,
                category: existingTransaction.category,
            });

            if (oldBudget) {
                oldBudget.spent = Math.max(0, oldBudget.spent - existingTransaction.amount);
                await oldBudget.save();
            }
        } else if (updatedTransaction.type === "expense") {
            // If the transaction remains an expense, check if the category changed
            if (existingTransaction.category !== updatedTransaction.category) {
                // Adjust both the old and new budgets
                const oldBudget = await Budget.findOne({
                    user: req.user._id,
                    category: existingTransaction.category,
                });

                if (oldBudget) {
                    oldBudget.spent = Math.max(0, oldBudget.spent - existingTransaction.amount);
                    await oldBudget.save();
                }

                const newBudget = await Budget.findOne({
                    user: req.user._id,
                    category: updatedTransaction.category,
                });

                if (newBudget) {
                    newBudget.spent += updatedTransaction.amount;
                    await newBudget.save();
                }
            } else {
                // If the category remains the same, just update the spent amount
                const budget = await Budget.findOne({
                    user: req.user._id,
                    category: updatedTransaction.category,
                });

                if (budget) {
                    budget.spent = updatedTransaction.amount;
                    await budget.save();
                }
            }
        }

        res.json(updatedTransaction);

    } catch (error) {

        console.log("Error in editTransaction controller", error.message);

        res.status(500).json({ error: "Internal Server error" });

    }

};

export const deleteTransaction = async (req, res) => {

    const { id } = req.params;

    try {

        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {

            return res.status(404).json({ error: "Transaction not found" });

        }

        if (transaction.type === "expense") {
            const budget = await Budget.findOne({
                user: req.user._id,
                category: transaction.category,
            });

            if (budget) {
                budget.spent -= transaction.amount;
                await budget.save();
            }
        }

        res.json({ message: "Transaction deleted successfully" });


    } catch (error) {

        console.log("Error in deleteTransaction controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
};