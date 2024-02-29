import { PrismaClient } from "@prisma/client";
import { Container } from "typedi";
import { UserImplController } from "../controllers/user/user-impl.controller";
import { IUserController } from "../controllers/user/user.controller";

export function injectContainers({ prisma }: { prisma: PrismaClient }) {
  Container.set("prisma", prisma);
  const userController: IUserController = Container.get(UserImplController);

  return {
    userController,
  };
}
