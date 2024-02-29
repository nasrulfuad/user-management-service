import z from "zod";
import type { Request, Response, NextFunction } from "express";

export function bodyValidatorMiddleware(schema: z.ZodObject<any, any, any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    const parsed = schema.safeParse(req.body);

    if (parsed.success) {
      next();
    } else {
      next(parsed.error);
    }
  };
}

export function queryValidatorMiddleware(schema: z.ZodObject<any, any, any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    const parsed = schema.safeParse(req.query);

    if (parsed.success) {
      next();
    } else {
      next(parsed.error);
    }
  };
}
