export interface IUser {
  id: string;
  name: string;
  address: string;
  email: string;
  password?: string;
  photos: string[];
  creditcard: ICreditCard;
}

export interface ICreditCard {
  id: string;
  type: string;
  number: string;
  name: string;
  expired: string;
}
