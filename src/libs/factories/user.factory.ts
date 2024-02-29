import { UserImplModel } from "../../models/user/user-impl.model";
import { IUser } from "../../models/user/user.model";
import { IFactory } from "./factory";

class UserFactory implements IFactory<IUser> {
  create(p: IUser): IUser {
    return new UserImplModel(
      p.id,
      p.name,
      p.address,
      p.email,
      p.password,
      p.photos.map((file_name) => `/uploads/${file_name}`),
      p.creditcard
    );
  }
}

export const userFactory = new UserFactory();
