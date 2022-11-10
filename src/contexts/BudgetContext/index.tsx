/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import { inputsBase } from "../../components/InputsBase";
import { IGeneratePdfProps } from "../../services/generatePdf";
// import { useUserContext } from "../UserContext/index";
import iBudgetApi from "../../services/iBudgetApi";
import { generatePdf } from "../../services/generatePdf";

import { IBudget } from '../UserContext/interfaces';
import { useCustomerContext } from '../CustomersContext/index';
import {
  IBudgetContext,
  IBudgetOmitId,
  // IBudgetOmitIdProps,
  IBudgetProvider,
} from "./interfaces";

export const BudgetContext = createContext<IBudgetContext>(
  {} as IBudgetContext
);

export const useBudgetContext = (): IBudgetContext => {
  const context = useContext(BudgetContext);
  return context;
};

export const BudgetProvider = ({ children }: IBudgetProvider) => {
  const [fixedValue, setFixedCost] = useState<number | string>(0);
  const [variableValue, setVariableCost] = useState<number | string>(0);
  const [totalDays, setTotalDays] = useState<string>("-");
  const [onModalFixedCost, setOnModalFixedCost] = useState(false);
  const [onModalVariableCost, setOnModalVariableCost] = useState(false);
  const [onHistoric, setOnHistoric] = useState(false);
  const [onCreateBudget, setOnCreateBudget] = useState(true);
  const [editModalCard, setEditModalCard] = useState(false);
  const [clickedBudgetId, setClickedBudgetId] = useState<string | number>(0);
  const [inputProjectName, setInputProjectName] = useState<string>("");
  const [inputBudgetValue, setBudgetValue] = useState<number>(0);
  const [inputProjectTime, setProjectTime] = useState<number>(0);
  const [budgets, setBudgets] = useState<IBudget[]>([]);

  const { clickedId } = useCustomerContext();

  const priceFormated = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // useEffect(() => {
  //   requestBudget();
  // }, []);

  const requestBudget = async () => {
      try {
        const userResponse = await iBudgetApi.get(
          `/customers/${clickedId}`
        );
        console.log("ola")
        setBudgets(userResponse.data.budgets);
      } catch (error) {
        console.error("Erro na requisição dos orçamentos.");
      }
  };

  const addFixedValue = (data: any): void => {
    const array = Object.values(data).filter((elemnt) => !!elemnt);
    const reduceArray = array.reduce(
      (acc: number, current) => acc + Number(current),
      0
    );
    setFixedCost(reduceArray);
    setOnModalFixedCost(false);
  };
  const addVariableValue = (data: any): void => {
    const array = Object.values(data).filter((elemnt) => !!elemnt);
    const reduceArray = array.reduce(
      (acc: number, current) => acc + Number(current),
      0
    );
    setVariableCost(reduceArray);
    setOnModalVariableCost(false);
  };

  const addEditedValue = async (data: any): Promise<void> => {
    const array = Object.values(data).filter((elemnt) => !!elemnt);

    const editedValues = {
      projectName: array[0],
      projectTime: array[1],
      budget: array[2],
    };

    try {
      await iBudgetApi.patch(`/budgets/${clickedBudgetId}`, editedValues);
      requestBudget();
      toast.success("Orçamento editado com sucesso");
      setEditModalCard(false);
    } catch (error) {
      toast.error("Erro na edição do orçamento");
    }
  };

  const deleteBudgetHistory = async (id: number | string) => {
    await iBudgetApi.delete(`/budgets/${id}`);
    requestBudget();
  };

  const generatePDF = (date: IGeneratePdfProps): void => {
    generatePdf(date);
  };

  const sendBudget = (data: IBudgetOmitId): void => {
    const {
      fixedCost,
      variableCost,
      endDate,
      startDate,
      daysWeek,
      estimatedSalary,
      hoursDay,
      ...rest
    } = data;

    if (startDate < endDate) {
      const allValues =
        Number(fixedValue) + Number(variableValue) + estimatedSalary;
      const weekHours = hoursDay * daysWeek;
      const monthHours = weekHours * 4;
      const hoursCost = allValues / monthHours;

      setTotalDays(priceFormated.format(Math.floor(hoursCost)));

      const newEndDate = endDate.split("-");
      const yearEndDate = Number(newEndDate[0]);
      const mouthEndDate = Number(newEndDate[1]);
      const dayEndDate = Number(newEndDate[2]);
      const newStartDate = startDate.split("-");
      const yearStartDate = Number(newStartDate[0]);
      const mouthStartDate = Number(newStartDate[1]);
      const dayStartDate = Number(newStartDate[2]);

      const days =
        yearEndDate * 365 -
        yearStartDate * 365 +
        (mouthEndDate * 30 - mouthStartDate * 30) +
        (dayEndDate - dayStartDate);

      const deadLine = days * hoursDay;
      const finalBudget = hoursCost * deadLine;

      const id = Number(localStorage.getItem("@id"));

      // const newData: IBudgetOmitIdProps = {
      //   fixedCost: fixedValue,
      //   variableCost: variableValue,
      //   projectTime: days,
      //   budget: finalBudget,
      //   userId: id,
      //   ...rest,
      // };

      const request = async () => {
        try {
          // await iBudgetApi.post<IBudgetOmitIdProps>("/budgets", newData);
          requestBudget();
        } catch (error) {
          console.error(error);
        }
      };
      request();
    }
  };

  return (
    <BudgetContext.Provider
      value={{
        setFixedCost,
        setVariableCost,
        setTotalDays,
        onCreateBudget,
        setOnCreateBudget,
        onHistoric,
        setOnHistoric,
        editModalCard,
        setEditModalCard,
        totalDays,
        fixedValue,
        variableValue,
        inputsBase,
        onModalFixedCost,
        onModalVariableCost,
        inputProjectName,
        setInputProjectName,
        inputBudgetValue,
        setBudgetValue,
        inputProjectTime,
        setProjectTime,
        generatePDF,
        sendBudget,
        deleteBudgetHistory,
        setOnModalFixedCost,
        setOnModalVariableCost,
        setClickedBudgetId,
        addFixedValue,
        addVariableValue,
        addEditedValue,
        budgets
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
