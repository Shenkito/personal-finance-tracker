import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

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

export const deleteTransaction = async (req, res) => {

    try {

        const { id } = req.params;

        const transaction = await Transaction.findById(id);

        if (!transaction) {

            return res.status(404).json({ error: "Transaction not found" });

        }

        if (transaction.user.toString() !== req.user._id.toString()) {

            return res.status(403).json({ error: "Unauthorized" });

        }

        await transaction.remove();

        res.status(200).json({ message: "Transaction deleted" });

    } catch (error) {

        console.log("Error in deleteTransaction controller", error.message);

        res.status(500).json({ error: "Internal Server Error" });

    }
};