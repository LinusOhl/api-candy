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
router.post(
  "/",
  [
    body("name")
      .isString()
      .withMessage("Has to be a string.")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Has to be atleast 3 characters long."),
    body("description")
      .isString()
      .withMessage("Has to be a string.")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Has to be atleast 6 characters long."),
    body("price")
      .isInt({ min: 1 })
      .withMessage("Has to be an int, value atleast 1."),
    body("images")
      .isObject()
      .withMessage("Has to be an object with values 'thumbnail' & 'large'."),
    body("stock_status")
      .isIn(["instock", "outofstock"])
      .withMessage("Has to be either 'instock' or 'outofstock'."),
    body("stock_quantity")
      .isInt({ min: 0 })
      .withMessage("Has to be an int, value atleast: 0."),
    body("on_sale")
      .optional()
      .isBoolean()
      .withMessage("Has to be either 'true' or 'false'."),
  ],
  store
);

export default router;
