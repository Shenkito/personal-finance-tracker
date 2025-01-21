import express from "express";
import { createBudget, getBudgets } from "../controllers/budgetController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getBudgets);

router.post("/", protectRoute, createBudget);

export default router;