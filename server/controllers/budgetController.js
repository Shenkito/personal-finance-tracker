import Budget from "../models/budgetModel.js";
import User from "../models/userModel.js";

export const createBudget = async (req, res) => {
    try {

        const { category, limit, startDate, endDate } = req.body;

        if (!category || !limit) {

            return res.status(400).json({ error: "All fields are required" });

        }

        const newBudget = new Budget({
            category,
            limit,
            startDate,
            endDate: new Date("12.03.2025"),
            user: req.user._id
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