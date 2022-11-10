import { ReactNode } from "react";
import { IInputs } from "../../components/InputsBase";
import { IGeneratePdfProps } from "../../services/generatePdf";
import { IBudget } from "../UserContext/interfaces";

export interface IBudgetOmitId {
  projectName: string;
  fixedCost: number;
  variableCost: number;
  startDate: string;
  endDate: string;
  daysWeek: number;
  estimatedSalary: number;
  hoursDay: number;
}

export type IBudgetOmitIdProps = Omit<IBudget, "id">;

export interface IBudgetProvider {
  children: ReactNode;
}

export interface IBudgetContext {
  setFixedCost: (value: number | string) => void;
  setVariableCost: (value: number | string) => void;
  setTotalDays: (string: string) => void;
  totalDays: string;
  fixedValue: number | string;
  variableValue: number | string;
  onModalFixedCost: boolean;
  onModalVariableCost: boolean;
  editModalCard: boolean;
  onCreateBudget: boolean;
  onHistoric: boolean;
  inputsBase: IInputs[];
  budgets: IBudget[];
  sendBudget: (data: IBudgetOmitId) => void;
  addFixedValue: (data: any) => void;
  addVariableValue: (data: any) => void;
  addEditedValue: (data: any) => void;
  setOnModalFixedCost: (modalFixedValue: boolean) => void;
  inputProjectName: string;
  setInputProjectName: (string: string) => void;
  inputBudgetValue: number;
  setBudgetValue: (number: number) => void;
  inputProjectTime: number;
  setProjectTime: (number: number) => void;
  setOnModalVariableCost: (modalVariableValue: boolean) => void;
  setEditModalCard: (editModalCard: boolean) => void;
  setClickedBudgetId: (data: number | string) => void;
  setOnHistoric: (onHistoric: boolean) => void;
  deleteBudgetHistory: (id: number | string) => Promise<void>;
  generatePDF: (date: IGeneratePdfProps) => void;
  setOnCreateBudget: (createBudget: boolean) => void;
}

export interface IFixedCost {
  input0: IInputs;
  input1: IInputs;
  input2: IInputs;
  input3: IInputs;
  input4: IInputs;
  input5: IInputs;
  input6: IInputs;
  input7: IInputs;
}
