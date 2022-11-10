/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { AxiosError } from "axios";

import iBudgetApi from "../../services/iBudgetApi";
import userPng from "../../assets/img/user.png";
import {
  ILoginData,
  ILoginForm,
  IRegisterForm,
  IUser,
  IUserProviderData,
  IUserProviderProps,
  IEditUser,
  IMessageError,
  IDecode
} from "./interfaces";
import { ICustomer } from "../CustomersContext/interfaces";


export const UserContext = createContext<IUserProviderData>(
  {} as IUserProviderData
);

export const useUserContext = (): IUserProviderData => {
  const context = useContext(UserContext);

  return context;
};

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isSobre, setIsSobre] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<string>("");
  const [onModalUserInfo, setOnModalUserInfo] = useState<boolean>(false);
  const [customersHistory, setCustomersHistory] = useState<ICustomer[]>([]);
  
  const navigate = useNavigate();

  const handleEditUserInfo = async (data: IEditUser) => {
    try {
      await iBudgetApi.patch(`/users/${user.uuid}`, data);
      loadUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await iBudgetApi.delete(`/users/${user.uuid}`);
      localStorage.clear();
      navigate("/home")
    } catch (error) {
      console.error(error)
    }
  };

  async function loadUser() {
    const token: string | null = localStorage.getItem("@token");
    const id: string | null = localStorage.getItem("@id");

    if (typeof token === "string" && typeof id === "string") {
      try {
        iBudgetApi.defaults.headers.common.authorization = `Bearer ${token}`;
        const userResponse = await iBudgetApi.get(
          `/users/${id}`
        );
        
        setUser(userResponse.data);
        setCustomersHistory(userResponse.data.customers);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect((): void => {
    loadUser();
  }, [navigate]);

  const onSubmitLogin = async (loginFormData: ILoginForm) => {
    try {
      const response = await iBudgetApi.post<ILoginData>(
        "/login",
        loginFormData
      );
      localStorage.clear();
      localStorage.setItem("@token", response.data.token);

      const id = jwtDecode<IDecode>(response.data.token as string).sub;
      localStorage.setItem("@id", id);
   
      navigate("/dashboard/customers");
      toast.success("Login realizado com sucesso!");
      setIsAuthenticated(true);
    } catch (err: unknown) {
      const errors = err as AxiosError;
      const messageError = (errors.response?.data as IMessageError).message;
      console.log(errors)
      
      if (messageError === "Invalid user or password") {
        toast.error("Email ou senha Incorretos");
      } else {
        console.error(errors.response?.data || errors.response);
        toast.error("Algo deu errado. Tente novamente mais tarde.");
      }
    }
  };

  const onSubmitRegister = async (registerFormData: IRegisterForm) => {
    const cadastro = {
      name: registerFormData.name,
      username: registerFormData.username,
      email: registerFormData.email,
      password: registerFormData.password,
      position: registerFormData.position,
      imageUrl: registerFormData.imageUrl,
    };
    if (registerFormData.username) {
      const name = registerFormData.username.toLowerCase();
      const firstLetter = name.split("").splice(0, 1).toString().toUpperCase();
      const otherLetters = name.split("").splice(1).join("");
      const capitalLetter = firstLetter.concat(otherLetters);

      cadastro.username = capitalLetter;
    }

    if (registerFormData.imageUrl === "" && isImage === "") {
      cadastro.imageUrl = userPng;
    } else if (!registerFormData.imageUrl?.includes("http") && isImage === "") {
      cadastro.imageUrl = userPng;
    } else if (registerFormData.imageUrl === "" && isImage !== "") {
      cadastro.imageUrl = isImage;
    }

    try {
      await iBudgetApi.post("/users", cadastro);
      toast.success("Cadastro realizado com sucesso!");
      setIsRegister(false);
      setIsLogin(true);
    } catch (err: unknown) {
      const errors = err as AxiosError;
      if (errors.response?.data === "Email already exists") {
        toast.error("Email já cadastrado");
      } else {
        toast.error("Usuário não cadastrado");
      }
    }
  };

  const handleSignOut = (): void => {
    setIsAuthenticated(false);
    setIsLogin(false);
    setIsHome(true);
    localStorage.clear();
    navigate("/home");
  };

  return (
    <UserContext.Provider
      value={{
        setCustomersHistory,
        customersHistory,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isHome,
        setIsHome,
        isLogin,
        setIsLogin,
        isRegister,
        setIsRegister,
        onModalUserInfo,
        setOnModalUserInfo,
        isSobre,
        setIsSobre,
        isImage,
        setIsImage,
        onSubmitLogin,
        onSubmitRegister,
        handleSignOut,
        handleEditUserInfo,
        handleDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
