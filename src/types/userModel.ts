import { Order } from './orderModel';

export type Roles = {
  admin?: number;
  customer?: number;
  founder?: number;
  creator?: number;
};

export type User = {
  id?: number;
  fullName: string;
  email?: string;
  password: string;
  phone?: string;
  address?: string;
  roles: Roles;
  createdAt?: Date;
  updatedAt?: Date;
  orders: Order[] | null;
  avatar?: string;
};

export type IUserLogin = Omit<
  User,
  | 'fullName'
  | 'orders'
  | 'id'
  | 'address'
  | 'roles'
  | 'createdAt'
  | 'updatedAt'
  | 'avatar'
>;

export type IUserRegister = Omit<
  User,
  'orders' | 'id' | 'address' | 'roles' | 'createdAt' | 'updatedAt' | 'avatar'
> & {
  confirmPassword: string;
};

export interface IUserLoggedIn {
  user: User;
  accessToken: string;
}
