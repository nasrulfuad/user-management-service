import { PrismaClient } from "@prisma/client";
import express, { Express, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../../libs/http/error";
import {
  bodyValidatorMiddleware,
  queryValidatorMiddleware,
} from "../../middlewares/validator.middleware";
import { userRegisterRequest } from "../../web/user/user-register.request";
import { environment } from "../environtment";
import { injectContainers } from "../inject-container";
import { validatorHeaderKeyMiddleware } from "../../middlewares/validator-header-key.middleware";
import { uploader } from "../../libs/uploader";
import { userListQueryRequest } from "../../web/user/user-list-query.request";

export function router(app: Express, prisma: PrismaClient): Express {
  const { userController } = injectContainers({ prisma });

  app.get("/", (req, res) => {
    return res.end("Hello");
  });

  const userRouter = express.Router();
  {
    userRouter.patch("/", userController.update.bind(userController));
    userRouter.post(
      "/register",
      uploader.array("photos", 10),
      bodyValidatorMiddleware(userRegisterRequest),
      userController.register.bind(userController)
    );
    userRouter.get(
      "/list",
      queryValidatorMiddleware(userListQueryRequest),
      userController.list.bind(userController)
    );
    userRouter.get("/:user_id", userController.findOne.bind(userController));

    app.use("/user", validatorHeaderKeyMiddleware, userRouter);
  }

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
      return res.status(400).json(err.issues);
    }

    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({
        error: err.message,
      });
    }

    /** Add logger, custom errors, etc. */
    console.error(err.stack);
    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  });

  return app;
}
