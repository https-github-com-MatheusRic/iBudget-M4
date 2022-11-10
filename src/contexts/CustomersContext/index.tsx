import { createContext, useContext, useState } from "react";
import { 
  ICreateCustomer, 
  ICustomerContext, 
  ICustomerProvider, 
  IUpdateCustomer 
} from "./interfaces";
import iBudgetApi from "../../services/iBudgetApi";
import { useUserContext } from "../UserContext";

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

  const createCustomer = async (data: ICreateCustomer): Promise<void> => {
    try {
      await iBudgetApi.post("/customers", data);
      sendCustomers();
    } catch (error) {
      console.error(error);
    }
  }

  const sendCustomers = async (): Promise<void> => {
    try {
      const res = await iBudgetApi.get("/customers");
      setCustomersHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const updateCustomer = async (data: IUpdateCustomer): Promise<void> => {
    try {
      await iBudgetApi.patch(`/customers/${clickedId}`, data);
      sendCustomers();
      setEditModalCard(false)
    } catch (error) {
      console.error(error);
    }
  }

  const deleteCustomer = async (uuid: string): Promise<void> => {
    try {
      await iBudgetApi.delete(`/customers/${uuid}`);
      sendCustomers();
    } catch (error) {
      console.error(error);
    }
  }

  const navigateDashboardBudget = (uuid: string) => {
    setClickedId(uuid);
    
  }

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
        navigateDashboardBudget,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
