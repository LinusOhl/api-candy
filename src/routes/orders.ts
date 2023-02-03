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
    body("customerFirstName")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Has to be a string and atleast 2 characters long."),
    body("customerLastName")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Has to be a string and atleast 2 characters long."),
    body("customerAddress")
      .isString()
      .isLength({ min: 4 })
      .withMessage("Has to be a string and atleast 4 characters long."),
    body("customerPostcode")
      .isString()
      .isLength({ max: 6 })
      .withMessage("Has to be a string and 6 characters long."),
    body("customerCity")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Has to be a string and atleast 2 characters long."),
    body("customerEmail").isEmail().withMessage("Has to be a valid email."),
    body("customerPhone")
      .optional()
      .isString()
      .isLength({ min: 6 })
      .withMessage("Has to be a string and atleast 6 characters long."),
    body("orderTotal")
      .isInt()
      .isLength({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
    body("items.*.productId")
      .isInt()
      .isLength({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
    body("items.*.qty")
      .isInt()
      .isLength({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
    body("items.*.itemPrice")
      .isInt()
      .isLength({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
    body("items.*.itemTotal")
      .isInt()
      .isLength({ min: 1 })
      .withMessage("Has to be an int and atleast 1."),
  ],
  store
);

export default router;
