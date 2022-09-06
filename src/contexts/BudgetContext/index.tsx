import { createContext, useState, useEffect, useContext } from "react";
import { inputsBase } from "../../components/InputsBase";
// import { IBudget } from "../UserContext/interfaces";

import { IGeneratePdfProps } from "../../services/generatePdf";
// import { useUserContext } from "../UserContext/index";
import iBudgetApi from "../../services/iBudgetApi";
import { generatePdf } from "../../services/generatePdf";

import { toast } from "react-toastify";
import {
  IBudgetContext,
  IBudgetOmitId,
  IBudgetOmitIdProps,
  IBudgetProvider,
} from "./interfaces";
import { UserContext } from "../UserContext";

export const BudgetContext = createContext<IBudgetContext>(
  {} as IBudgetContext
);

export const useBudgetContext = (): IBudgetContext => {
  const context = useContext(BudgetContext);
  return context;
};

export const BudgetProvider = ({ children }: IBudgetProvider) => {
  const [fixedValue, setFixedCost] = useState(0);
  const [variableValue, setVariableCost] = useState(0);
  const [totalDays, setTotalDays] = useState<string>("");
  const [onModalFixedCost, setOnModalFixedCost] = useState(false);
  const [onModalVariableCost, setOnModalVariableCost] = useState(false);
  const [editModalCard, setEditModalCard] = useState(false);
  const [clickedBudgetId, setClickedBudgetId] = useState<string | number>(0);
  const [inputProjectName, setInputProjectName] = useState<string>("");
  const [inputBudgetValue, setBudgetValue] = useState<string>("");
  const [inputProjectTime, setProjectTime] = useState<number>(0);

  const { setBudgetHistory } = useContext(UserContext);

  const priceFormated = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    requestBudget();
  });

  const requestBudget = async () => {
    const id: string | null = localStorage.getItem("@id");
    const token: string | null = localStorage.getItem("@token");

    if (typeof token === "string" && typeof id === "string") {
      try {
        iBudgetApi.defaults.headers.common.authorization = `Bearer ${token}`;
        const userResponse = await iBudgetApi.get(
          `/users/${id}?_embed=budgets`
        );
        setBudgetHistory(userResponse.data.budgets);
      } catch (error) {
        console.error("Erro Request Budget");
      }
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
      const allValues = fixedValue + variableValue + estimatedSalary;
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

      const newData: IBudgetOmitIdProps = {
        fixedCost: fixedValue,
        variableCost: variableValue,
        projectTime: days,
        budget: priceFormated.format(finalBudget),
        userId: id,
        ...rest,
      };

      const request = async () => {
        try {
          await iBudgetApi.post<IBudgetOmitIdProps>("/budgets", newData);
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
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
