import { AnimatePresence, motion } from "framer-motion";
import { ModalEditCardCustomer } from "../ModalEditCardCustomer";

import { MainConteiner } from "./style";
import { CreateCustomer } from "../CreateCustomer";
import { CustomerHistory } from '../CustomerHistory/index';
import { useCustomerContext } from '../../contexts/CustomersContext/index';

export const DashboardCustomers = () => {
  const { editModalCard } = useCustomerContext();

  return (
    <main>
      <MainConteiner
        as={motion.div}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <section>
          <div>
            <CreateCustomer />
          </div>
        </section>
        <section>
          <CustomerHistory />
        </section>
      </MainConteiner>

      <AnimatePresence>
        {editModalCard && <ModalEditCardCustomer />}
      </AnimatePresence>
    </main>
  );
};
