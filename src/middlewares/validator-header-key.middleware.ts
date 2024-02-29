import type { NextFunction, Request, Response } from "express";
import { environment } from "../app/environtment";
import {
  HttpApiKeyInvalidError,
  HttpApiKeyMissingError,
} from "../libs/http/error";

export function validatorHeaderKeyMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const headerApiKey = req.headers["key"];

  if (!headerApiKey) return next(new HttpApiKeyMissingError());

  if (headerApiKey !== environment.get("HEADER_KEY")) {
    return next(new HttpApiKeyInvalidError());
  }

  return next();
}
