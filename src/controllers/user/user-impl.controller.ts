import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { UserImplService } from "../../services/user/user-impl.service";
import { IUserService } from "../../services/user/user.service";
import {
  IUserController,
  TUserListResponse,
  TUserRegisterResponse,
  TUserUpdateResponse,
} from "./user.controller";
import { removeFile } from "../../helper/remove-file";
import { IUser } from "../../models/user/user.model";

@Service()
export class UserImplController implements IUserController {
  @Inject(() => UserImplService)
  private userService: IUserService;

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TUserRegisterResponse> | void> {
    try {
      if (!Array.isArray(req.files))
        throw new Error('"files" must be an array');
      const fileNames = req.files?.map((file) => file.filename);

      const r = await this.userService.register(req.body, fileNames);
      return res.json({ user_id: r.id });
    } catch (error) {
      /** Remove files if something went wrong */
      if (Array.isArray(req.files)) {
        req.files?.map(async (file) => {
          await removeFile(file.path);
        });
      }

      next(error);
    }
  }

  async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TUserListResponse> | void> {
    try {
      const r = await this.userService.list(req.query);
      return res.json({ rows: r.rows, count: r.count });
    } catch (error) {
      next(error);
    }
  }

  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser> | void> {
    try {
      const r = await this.userService.findOne(req.params.user_id);
      return res.json(r);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<TUserUpdateResponse> | void> {
    try {
      const r = await this.userService.findOne(req.params.user_id);
      return res.json(r);
    } catch (error) {
      next(error);
    }
  }
}
