/**
 * Controller Template
 */
import Debug from "debug";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug(
  "prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛"
);

/**
 * Get all products
 */
export const index = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.send({
      status: "success",
      data: products,
    });
  } catch (err) {
    debug("Error thrown when finding products", err);
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Get a single product
 */
export const show = async (req: Request, res: Response) => {
  const productId = Number(req.params.productId);

  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
    });
    res.send({
      status: "success",
      data: product,
    });
  } catch (err) {
    debug(
      "Error thrown when finding product with id: %o",
      req.params.productId,
      err
    );
    res.status(404).send({
      status: "error",
      message: "Not found",
    });
  }
};

/**
 * Create a product
 */
export const store = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).send({
      status: "fail",
      data: validationErrors.array(),
    });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        images: {
          thumbnail: req.body.images.thumbnail,
          large: req.body.images.large,
        },
        stock_status: req.body.stock_status,
        stock_quantity: req.body.stock_quantity,
        on_sale: req.body.on_sale,
      },
    });
    res.send({
      status: "success",
      data: product,
    });
  } catch (err) {
    debug("Error thrown when creating a product %o", req.body, err);
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
