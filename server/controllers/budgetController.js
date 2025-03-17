import Budget from "../models/budgetModel.js";
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

import { calculateSpentFromExistingTransactions } from "../utils/calculateSpentFromExistingTransactions.js";

export const createBudget = async (req, res) => {
    try {

        const { category, limit, startDate, endDate } = req.body;

        if (!category || !limit) {

            return res.status(400).json({ error: "All fields are required" });

        }

        const existingBudget = await Budget.findOne({ user: req.user._id, category });

        if (existingBudget) {
            return res.status(400).json({ error: "Budget for this category already exists" });
        };

        const transactions = await Transaction.find({
            user: req.user._id,
            category,
            type: "expense"
        });

        const totalSpentExistingTransactions = calculateSpentFromExistingTransactions(transactions)

        const newBudget = new Budget({
            category,
            limit,
            startDate,
            endDate,
            user: req.user._id,
            spent: totalSpentExistingTransactions
        });

        await newBudget.save();

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { budgets: newBudget._id } },
            { new: true }
        );

        res.status(201).json(newBudget);
    } catch (error) {

        console.error("Error creating budget:", error.message);
        res.status(500).json({ error: "Internal server error" });

    }
};

export const getBudgets = async (req, res) => {

    try {

        const budgets = await Budget.find({ user: req.user._id });

        res.status(200).json(budgets);

    } catch (error) {

        console.log("Error in getBudgets controller", error.message);

        res.status(500).json({ error: "Internal Server Error" });

    }
};