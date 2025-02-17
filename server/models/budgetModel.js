import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    spent: {
        type: Number,
        default: 0,
    },
    endDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;