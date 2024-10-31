import express from "express";
import { createTransaction, getTransactions, deleteTransaction, editTransaction } from "../controllers/transactionController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Get all transactions for the authenticated user
router.get("/", protectRoute, getTransactions);

// Create a new transaction
router.post("/", protectRoute, createTransaction);

// Edit a transaction by ID
router.put("/edit/:id", protectRoute, editTransaction);

// Delete a transaction by ID
router.delete("/delete/:id", protectRoute, deleteTransaction);


export default router;