import { NextFunction, Request, Response } from "express";

class ValidationError extends Error {}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: "Something went wrong! Try again later.",
  });
};
