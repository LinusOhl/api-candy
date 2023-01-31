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
export const index = async (req: Request, res: Response) => {};

/**
 * Get a single order
 */
export const show = async (req: Request, res: Response) => {};

/**
 * Create a order
 */
export const store = async (req: Request, res: Response) => {};
