/**
 * Router Template
 */
import express from "express";
import { body } from "express-validator";
import { index, show, store } from "../controllers/product_controller";
const router = express.Router();

/**
 * GET /products
 */
router.get("/", index);

/**
 * GET /products/:productId
 */
router.get("/:productId", show);

/**
 * POST /products
 */
router.post("/", [], store);

export default router;
