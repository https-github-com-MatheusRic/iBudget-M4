import { ReactNode } from 'react';

export interface ICustomer {
    uuid: string;
    name: string;
    isCompany?: boolean;
    email: string;
    contact?: string;
    userId?: string;
}

export type ICreateCustomer = Omit<ICustomer, "uuid">

export interface IUpdateCustomer {
    name?: string;
    isCompany?: boolean;
    email?: string;
    contact?: string;
}

export interface ICustomerProvider {
    children: ReactNode
}

export interface ICustomerContext {
    createCustomer: (data: ICreateCustomer) => void;
    onCreateCustomer: boolean;
    setOnCreateCustomer: (onCreateCustomer: boolean) => void;
    updateCustomer: (data: IUpdateCustomer) => void;
    deleteCustomer: (uuid: string) => void;
    editModalCard: boolean;
    setEditModalCard: (editModalCard: boolean) => void;
    setClickedId: (clickedId: string) => void;
    clickedId: string;
    sendBudgets: () => void;
}