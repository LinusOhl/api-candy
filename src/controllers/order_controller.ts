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
 * Get all orders
 */
export const index = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.send({
      status: "success",
      data: orders,
    });
  } catch (err) {
    debug("Error thrown when finding orders", err);
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Get a single order
 */
export const show = async (req: Request, res: Response) => {
  const orderId = Number(req.params.orderId);

  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
      include: {
        OrderItems: true,
      },
    });
    res.send({
      status: "success",
      data: order,
    });
  } catch (err) {
    debug(
      "Error thrown when finding order with id: %o",
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
 * Create a order
 */
export const store = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).send({
      status: "Fail",
      data: validationErrors.array(),
    });
  }

  const products = req.body.items;
  try {
    const orderAndOrderItems = await prisma.order.create({
      data: {
        customer_first_name: req.body.customer_first_name,
        customer_last_name: req.body.customer_last_name,
        customer_address: req.body.customer_address,
        customer_postcode: req.body.customer_postcode,
        customer_city: req.body.customer_city,
        customer_email: req.body.customer_email,
        customer_phone: req.body.customer_phone,
        order_total: req.body.order_total,
        OrderItems: {
          createMany: {
            data: products,
          },
        },
      },
      include: {
        OrderItems: true,
      },
    });

    res.send({
      status: "success",
      data: orderAndOrderItems,
    });
  } catch (err) {
    debug(
      "Error thrown when creating an order %o",
      req.body.items.productId,
      err
    );
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
