import type { NextFunction, Request, Response } from "express";
import { IUser } from "../../models/user/user.model";

export type TUserRegisterResponse = {
  user_id: string;
};

export type TUserListResponse = {
  rows: IUser[];
  count: number;
};

export type TUserUpdateResponse = {
  success: boolean;
};

export interface IUserController {
  register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TUserRegisterResponse> | void>;
  list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TUserListResponse> | void>;

  findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser> | void>;

  update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TUserUpdateResponse> | void>;
}
