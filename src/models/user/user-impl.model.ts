import { ICreditCard, IUser } from "./user.model";

export class UserImplModel implements IUser {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public email: string,
    public password: string | undefined,
    public photos: string[],
    public creditcard: ICreditCard
  ) {}
}
