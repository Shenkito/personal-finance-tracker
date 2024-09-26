// models/transactionModel.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Transport', 'Entertainment', 'Rent', 'Utilities', 'Health', 'Shopping', 'Salary', 'Other']
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'] // Make sure these values match what you're sending
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;