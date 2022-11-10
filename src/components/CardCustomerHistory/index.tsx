import { GoTrashcan } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";

import { ConteinerCardCustomerHistory } from "./style";
import { ICustomer } from "../../contexts/CustomersContext/interfaces";
import { useCustomerContext } from "../../contexts/CustomersContext/index";
import { useNavigate } from "react-router-dom";

export const CardCustomerHistory = ({
  name,
  uuid,
  email,
  contact,
}: ICustomer) => {
  const navigate = useNavigate();

  const {
    setEditModalCard,
    setClickedId,
    deleteCustomer
  } = useCustomerContext();

  const openEditModal = () => {
    setClickedId(uuid);
    setEditModalCard(true);
  };

  // const navigateDashboardBudget = () => {
  //   setClickedId(uuid);
  //   navigate("/dashboard/customer/budgets");
  // }

  return (
    <ConteinerCardCustomerHistory
      as={motion.li}
      layout
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{ duration: 0.3 }}
      // onClick={() => navigateDashboardBudget()}
    >
      <h2>{name}</h2>
      <span>email: {email}</span>
      {!!contact && <span>contact: {contact}</span>}
      <div>
        <FaRegEdit onClick={() => openEditModal()} />

        <GoTrashcan onClick={() => deleteCustomer(uuid)} />
      </div>
    </ConteinerCardCustomerHistory>
  );
};
