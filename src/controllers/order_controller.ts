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
  try {
    const orderAndOrderItems = await prisma.order.create({
      data: {
        customerFirstName: req.body.customerFirstName,
        customerLastName: req.body.customerLastName,
        customerAddress: req.body.customerAddress,
        customerPostcode: req.body.customerPostcode,
        customerCity: req.body.customerCity,
        customerEmail: req.body.customerEmail,
        customerPhone: req.body.customerPhone,
        orderTotal: req.body.orderTotal,
        OrderItems: {
          create: {
            productId: 1,
            qty: 4,
            itemPrice: 5,
            itemTotal: 20,
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
    debug("Error thrown when creating an order %o", req.body, err);
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
