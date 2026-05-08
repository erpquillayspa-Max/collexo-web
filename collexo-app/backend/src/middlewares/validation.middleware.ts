import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { fail } from "../types";

export function validate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      ...fail("Validation failed"),
      errors: errors.array(),
    });
    return;
  }
  next();
}
