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
router.post(
  "/",
  [
    body("customer_first_name")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Has to be a string and atleast 2 characters long."),
    body("customer_last_name")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Has to be a string and atleast 2 characters long."),
    body("customer_address")
      .isString()
      .isLength({ min: 4 })
      .withMessage("Has to be a string and atleast 4 characters long."),
    body("customer_postcode")
      .isString()
      .isLength({ max: 6 })
      .withMessage("Has to be a string and 6 characters long."),
    body("customer_city")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Has to be a string and atleast 2 characters long."),
    body("customer_email").isEmail().withMessage("Has to be a valid email."),
    body("customer_phone")
      .optional()
      .isString()
      .isLength({ min: 6 })
      .withMessage("Has to be a string and atleast 6 characters long."),
    body("order_total")
      .isInt({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
    body("items.*.product_id")
      .isInt({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
    body("items.*.qty")
      .isInt({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
    body("items.*.item_price")
      .isInt({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
    body("items.*.item_total")
      .isInt({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
  ],
  store
);

export default router;
