import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { useBudgetContext } from "../../contexts/BudgetContext";
import {
  ConteinerModal,
  Modal,
  ConteinerFormModal,
} from "../ModalFixedCost/style";
import { StyledModalEdit } from "./style";

interface IEditData {
  projectName: string;
  projectTime: string;
  budget: string;
}

export const ModalEditCardBudget = () => {
  const {
    addEditedValue,
    setEditModalCard,
    inputProjectName,
    inputBudgetValue,
    inputProjectTime,
  } = useBudgetContext();

  const { register, handleSubmit } = useForm<IEditData>();

  const handleOutsideClick = (event: React.SyntheticEvent) => {
    const targetId = (event.target as HTMLDivElement).id;
    if (targetId === "modalEditCard") {
      setEditModalCard(false);
    }
  };

  return (
    <ConteinerModal
      id="modalEditCard"
      onClick={(event) => handleOutsideClick(event)}
    >
      <Modal
        as={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <h2>Editar orçamento</h2>
          <span onClick={() => setEditModalCard(false)}>
            <IoIosCloseCircleOutline />
          </span>
        </div>
        <ConteinerFormModal>
          <form onSubmit={handleSubmit(addEditedValue)}>
            <StyledModalEdit>
              <label htmlFor="value">Nome do projeto:</label>
              <input
                type="text"
                id="value"
                defaultValue={inputProjectName}
                placeholder="Atualize os dados aqui"
                {...register("projectName")}
              />
              <label htmlFor="value">Conclusão em (dias):</label>
              <input
                type="text"
                id="value"
                defaultValue={inputProjectTime}
                placeholder="Atualize os dados aqui"
                {...register("projectTime")}
              />
              <label htmlFor="value">Valor Total do orçamento:</label>
              <input
                type="text"
                id="value"
                defaultValue={inputBudgetValue}
                placeholder="Atualize os dados aqui"
                {...register("budget")}
              />
              <button type="submit">Confirmar</button>
            </StyledModalEdit>
          </form>
        </ConteinerFormModal>
      </Modal>
    </ConteinerModal>
  );
};
