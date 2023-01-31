/**
 * Router Template
 */
import express from "express";
import { body } from "express-validator";
import { index, show, store } from "../controllers/order_controller";
const router = express.Router();

/**
 * GET /orders
 */
router.get("/", index);

/**
 * GET /orders/:orderId
 */
router.get("/:orderId", show);

/**
 * POST /orders
 */
router.post("/", [], store);

export default router;
