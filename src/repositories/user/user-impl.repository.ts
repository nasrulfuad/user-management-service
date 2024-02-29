import { Prisma, PrismaClient } from "@prisma/client";
import { IUserRepository } from "./user.repository";
import { Inject, Service } from "typedi";
import { ICreditCard, IUser } from "../../models/user/user.model";
import { UserRegisterRequest } from "../../web/user/user-register.request";
import { hashPassword } from "../../helper/password.helper";
import { userFactory } from "../../libs/factories/user.factory";
import { UserListQueryRequest } from "../../web/user/user-list-query.request";
import { HttpNotFoundError } from "../../libs/http/error";

@Service()
export class UserImplRepository implements IUserRepository {
  constructor(
    @Inject("prisma")
    private dataStore: PrismaClient
  ) {}

  update(t: IUser, id: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  async create(
    userRegisterRequest: UserRegisterRequest,
    fileNames: string[]
  ): Promise<IUser> {
    const {
      name,
      address,
      email,
      creditcard_cvv,
      creditcard_expired,
      creditcard_name,
      creditcard_number,
      creditcard_type,
    } = userRegisterRequest;
    const hashedPassword = await hashPassword(userRegisterRequest.password);

    const user = await this.dataStore.user.create({
      data: {
        name,
        email,
        address,
        password: hashedPassword,
        photos: {
          create: fileNames.map((fileName) => ({
            file_name: fileName,
          })),
        },
        creditcard: {
          create: {
            type: creditcard_type,
            number: creditcard_number,
            name: creditcard_name,
            expired: creditcard_expired,
            cvv: creditcard_cvv,
          },
        },
      },
      include: {
        photos: true,
        creditcard: true,
      },
    });

    return userFactory.create({
      id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      password: user.password,
      photos: user.photos.map(({ file_name }) => file_name),
      creditcard: {
        id: user.id,
        type: user.creditcard?.type,
        number: user.creditcard?.number,
        name: user.creditcard?.name,
        expired: user.creditcard?.expired,
        cvv: user.creditcard?.cvv,
      } as ICreditCard,
    });
  }

  async list(userListQueryRequest: UserListQueryRequest) {
    const {
      q,
      ob: orderBy,
      sb: sortBy,
      of: offset = 0,
      lt: limit = 30,
    } = userListQueryRequest;

    const condition: Prisma.UserFindManyArgs = {};

    if (q) {
      condition.where = {
        name: {
          contains: q,
        },
      };
    }

    if (orderBy) {
      condition.orderBy = {
        [orderBy]: sortBy || "asc",
      };
    }

    const users = await this.dataStore.user.findMany({
      ...condition,
      take: +limit,
      skip: +offset,
      include: {
        creditcard: true,
        photos: true,
      },
    });

    const count = await this.dataStore.user.count({
      where: condition.where,
    });

    const rows = users.map((user) =>
      userFactory.create({
        id: user.id,
        name: user.name,
        address: user.address,
        email: user.email,
        password: undefined,
        photos: user.photos.map(({ file_name }) => file_name),
        creditcard: {
          id: user.creditcard?.id,
          type: user.creditcard?.type,
          number: user.creditcard?.number.slice(-4),
          name: user.creditcard?.name,
          expired: user.creditcard?.expired,
          cvv: undefined,
        } as ICreditCard,
      })
    );

    return {
      count,
      rows,
    };
  }

  async findOne(id: string) {
    const user = await this.dataStore.user.findUnique({
      where: {
        id,
      },
      include: {
        creditcard: true,
        photos: true,
      },
    });

    if (!user) throw new HttpNotFoundError("User Not Found");

    return userFactory.create({
      id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      password: undefined,
      photos: user.photos.map(({ file_name }) => file_name),
      creditcard: {
        id: user.creditcard?.id,
        type: user.creditcard?.type,
        number: user.creditcard?.number.slice(-4),
        name: user.creditcard?.name,
        expired: user.creditcard?.expired,
        cvv: undefined,
      } as ICreditCard,
    });
  }
}
