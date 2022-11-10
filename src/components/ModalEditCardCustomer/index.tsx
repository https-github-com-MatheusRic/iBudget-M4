import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { IoIosCloseCircleOutline } from "react-icons/io";

import {
  ConteinerModal,
  Modal,
  ConteinerFormModal,
} from "../ModalFixedCost/style";
import { StyledModalEdit } from "./style";
import { IUpdateCustomer } from "../../contexts/CustomersContext/interfaces";
import { useCustomerContext } from '../../contexts/CustomersContext/index';

export const ModalEditCardCustomer = () => {
  const {
    setEditModalCard,
    updateCustomer
  } = useCustomerContext();

  const { register, handleSubmit } = useForm<IUpdateCustomer>();

  const handleOutsideClick = (data: IUpdateCustomer) => {
    updateCustomer(data);
  };

  return (
    <ConteinerModal>
      <Modal
        as={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <h2>Editar cliente</h2>
          <span onClick={() => setEditModalCard(false)}>
            <IoIosCloseCircleOutline />
          </span>
        </div>
        <ConteinerFormModal>
          <form onSubmit={handleSubmit(handleOutsideClick)}>
            <StyledModalEdit>
              <label htmlFor="value">Nome do cliente:</label>
              <input
                type="text"
                id="value"           
                placeholder="Atualize os dados aqui"
                {...register("name")}
              />

              <label htmlFor="value">Email do cliente:</label>
              <input
                type="text"
                id="value"
                placeholder="Atualize os dados aqui"
                {...register("email")}
              />

              <label htmlFor="value">Contato do cliente:</label>
              <input
                type="text"
                id="value"            
                placeholder="Atualize os dados aqui"
                {...register("contact")}
              />

              <label htmlFor="value">Cliente possui empresa?</label>
              <input
                type="checkbox"
                id="value"
                {...register("isCompany")}
              />
              <button type="submit">Confirmar</button>
            </StyledModalEdit>
          </form>
        </ConteinerFormModal>
      </Modal>
    </ConteinerModal>
  );
};
