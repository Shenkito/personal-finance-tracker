import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePicture: {
        type: String
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    budgets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget'
    }]
    // we get createdAt , updatedAt => can use for Member since. 
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;