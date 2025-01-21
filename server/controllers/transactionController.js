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