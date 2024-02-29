import { Inject, Service } from "typedi";
import { IUser } from "../../models/user/user.model";
import { UserImplRepository } from "../../repositories/user/user-impl.repository";
import { IUserRepository } from "../../repositories/user/user.repository";
import { UserRegisterRequest } from "../../web/user/user-register.request";
import { IUserService } from "./user.service";
import { UserListQueryRequest } from "../../web/user/user-list-query.request";

@Service()
export class UserImplService implements IUserService {
  constructor(
    @Inject(() => UserImplRepository)
    private userRepo: IUserRepository
  ) {}

  register(
    userRegisterRequest: UserRegisterRequest,
    fileNames: string[]
  ): Promise<IUser> {
    return this.userRepo.create(userRegisterRequest, fileNames);
  }

  list(userListQueryRequest: UserListQueryRequest) {
    return this.userRepo.list(userListQueryRequest);
  }

  findOne(id: string) {
    return this.userRepo.findOne(id);
  }
}
