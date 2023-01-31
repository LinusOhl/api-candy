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
    debug("Error thrown when finding books", err);
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
      "Error thrown when finding book with id: %o",
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
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        images: {
          thumbnail: req.body.thumbnail,
          large: req.body.large,
        },
        stockStatus: req.body.stockStatus,
        stockQuantity: req.body.stockQuantity,
        onSale: req.body.onSale,
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
