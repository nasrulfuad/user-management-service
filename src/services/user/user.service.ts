import { IUser } from "../../models/user/user.model";
import { UserListQueryRequest } from "../../web/user/user-list-query.request";
import { UserRegisterRequest } from "../../web/user/user-register.request";

export interface IUserService {
  register(
    userRegisterRequest: UserRegisterRequest,
    fileNames: string[]
  ): Promise<IUser>;
  list(
    userListQueryRequest: UserListQueryRequest
  ): Promise<{ rows: IUser[]; count: number }>;
  findOne(id: IUser["id"]): Promise<IUser>;
}
