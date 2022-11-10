import { createContext, useContext, useState, useEffect } from "react";
import {
  ICreateCustomer,
  ICustomerContext,
  ICustomerProvider,
  IUpdateCustomer,
} from "./interfaces";
import iBudgetApi from "../../services/iBudgetApi";
import { useUserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const CustomerContext = createContext<ICustomerContext>({} as ICustomerContext);

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  return context;
};

export const CustomerProvider = ({ children }: ICustomerProvider) => {
  const [onCreateCustomer, setOnCreateCustomer] = useState<boolean>(true);
  const [editModalCard, setEditModalCard] = useState<boolean>(false);
  const [clickedId, setClickedId] = useState<string>("");

  const { setCustomersHistory } = useUserContext();
  const navigate = useNavigate();

  const createCustomer = async (data: ICreateCustomer): Promise<void> => {
    try {
      await iBudgetApi.post("/customers", data);
      sendCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const sendCustomers = async (): Promise<void> => {
    try {
      const res = await iBudgetApi.get("/customers");
      setCustomersHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendBudgets = async (): Promise<void> => { 
    const token = localStorage.getItem("@token");

    if (typeof token === "string") {
      try {
        const res = await iBudgetApi.get(`/customers/${clickedId}`);
        console.log(res.data.budgets);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (clickedId.length > 0) {
      console.log("com id")
      sendBudgets();
      return;
    }
    console.log("sem id");
  }, [navigate]);

  const updateCustomer = async (data: IUpdateCustomer): Promise<void> => {
    try {
      await iBudgetApi.patch(`/customers/${clickedId}`, data);
      sendCustomers();
      setEditModalCard(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCustomer = async (uuid: string): Promise<void> => {
    try {
      await iBudgetApi.delete(`/customers/${uuid}`);
      sendCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        createCustomer,
        onCreateCustomer,
        setOnCreateCustomer,
        updateCustomer,
        deleteCustomer,
        editModalCard,
        setEditModalCard,
        setClickedId,
        clickedId,
        sendBudgets,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
