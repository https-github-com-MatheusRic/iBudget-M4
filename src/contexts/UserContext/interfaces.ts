import { ReactNode } from "react";
import { ICustomer } from '../CustomersContext/interfaces';

export interface IUserProviderProps {
  children: ReactNode;
}

export interface IUser {
  email: string;
  password?: string;
  name: string;
  username: string;
  position: string;
  imageUrl: string;
  uuid: string | number;
  budgets?: IBudget[];
}

export interface IBudget {
  projectName: string;
  projectTime: number;
  fixedCost: number | string;
  variableCost: number | string;
  budget: number;
  id: string | number;
  userId?: string | number | null;
}

export interface ILoginForm {}

export interface IEditUser {
  name?: string;
  username?: string;
  password?: string;
  position?: string;
  imageUrl?: string;
}

export interface IRegisterForm {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  position?: string;
  imageUrl?: string;
}

export interface IUserProviderData {
  customersHistory: ICustomer[];
  user: IUser;
  isAuthenticated: boolean;
  isHome: boolean;
  isLogin: boolean;
  isRegister: boolean;
  isSobre: boolean;
  isImage: string;
  onModalUserInfo: boolean;
  setOnModalUserInfo: (boolean: boolean) => void;
  setUser: (user: IUser) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsHome: (isHome: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
  setIsSobre: (isSobre: boolean) => void;
  setIsRegister: (isRegister: boolean) => void;
  setIsImage: (isImage: string) => void;
  setCustomersHistory: (customersHistory: ICustomer[]) => void;
  onSubmitLogin: (loginFormData: ILoginForm) => void;
  onSubmitRegister: (registerFormData: IRegisterForm) => void;
  handleSignOut: () => void;
  handleEditUserInfo: (data: IEditUser) => void;
  handleDeleteUser: () => void;
}

export interface ILoginData {
  token: string;
  user: IUser;
}

export interface IMessageError {
  message: string;
}

export interface IDecode {
  iat: number;
  exp: number;
  sub: string;
}
