import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { ContainerCreate } from "../CreateBudget/styles";
import { DivCompanyContact } from "./style";
import { ICreateCustomer } from "../../contexts/CustomersContext/interfaces";
import { useCustomerContext } from "../../contexts/CustomersContext/index";

export const CreateCustomer = () => {
  const { createCustomer } = useCustomerContext();

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    isCompany: yup.boolean().notRequired(),
    email: yup.string().required(),
    contact: yup.string().notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCustomer>({
    resolver: yupResolver(formSchema),
  });

  const onError = () => {
    toast.error("Dados do orçamento incorretos", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <ContainerCreate>
      <h1>Preencha os dados</h1>
      <form onSubmit={handleSubmit(createCustomer, onError)}>
        <label htmlFor="name">
          Nome: <span>*</span>
        </label>
        <input type="text" id="name" placeholder="Nome" {...register("name")} />
        <span>{errors.name?.message}</span>

        <label htmlFor="email">
          Email: <span>*</span>
        </label>
        <input
          type="text"
          id="email"
          placeholder="Ex: email@email.com"
          {...register("email")}
        />
        <span>{errors.email?.message}</span>

        <div>
          <DivCompanyContact>
            <div>
              <label htmlFor="isCompany">
                É uma empresa?
              </label>
              <input
                type="checkbox"
                id="isCompany"
                placeholder="Ex: Projeto1"
                {...register("isCompany")}
              />
              <span>{errors.isCompany?.message}</span>
            </div>
            <div>
              <label htmlFor="contact">Contato:</label>
              <input
                type="text"
                id="contact"
                placeholder="Ex: Projeto1"
                {...register("contact")}
              />
              <span>{errors.contact?.message}</span>
            </div>
          </DivCompanyContact>
        </div>

        <button type="submit">Criar cliente</button>
      </form>
    </ContainerCreate>
  );
};
