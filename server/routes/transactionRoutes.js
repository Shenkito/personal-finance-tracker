import express from "express";
import { createTransaction, getTransactions, deleteTransaction } from "../controllers/transactionController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Create a new transaction
router.post("/", protectRoute, createTransaction);

// Get all transactions for the authenticated user
router.get("/", protectRoute, getTransactions);

// Delete a transaction by ID
router.delete("/:id", protectRoute, deleteTransaction);

export default router;