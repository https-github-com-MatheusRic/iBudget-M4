import { motion } from "framer-motion";

import { CardCustomerHistory } from "../CardCustomerHistory";
import { useUserContext } from "../../contexts/UserContext/index";
import { IoSearch } from "react-icons/io5";
import { ContainerCustomertHistory, FilterBar } from "./style";
import { useState } from "react";
import { useCustomerContext } from "../../contexts/CustomersContext/index";
import { ICustomer } from "../../contexts/CustomersContext/interfaces";

export const CustomerHistory = () => {
  const { setOnCreateCustomer, onCreateCustomer } = useCustomerContext();

  const { customersHistory } = useUserContext();
  const [searchValue, setSearchValue] = useState<string>("");

  customersHistory.sort((a, b) => Number(b.uuid) - Number(a.uuid));

  const normalize = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  const filteredCustomers =
    searchValue.length > 0
      ? customersHistory.filter((elem) => {
          const normalizedSearch = normalize(searchValue);
          const normalizedProjectName = normalize(elem.name);

          return normalizedProjectName.includes(normalizedSearch);
        })
      : customersHistory;

  return (
    <ContainerCustomertHistory>
      <FilterBar>
        <div>
          <h2>Histórico de clientes</h2>
          <h2 onClick={() => setOnCreateCustomer(!onCreateCustomer)}>
            Criar Cliente
          </h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <span>
            <IoSearch />
          </span>
        </div>
      </FilterBar>

      <motion.div>
        {searchValue.length > 0 ? (
          filteredCustomers.length > 0 ? (
            filteredCustomers.map(
              ({ uuid, name, contact, email }: ICustomer) => {
                return (
                  <CardCustomerHistory
                    key={uuid}
                    uuid={uuid}
                    name={name}
                    contact={contact}
                    email={email}
                  />
                );
              },
            )
          ) : (
            <p>
              Nada encontrado para: <strong>{searchValue}</strong>
            </p>
          )
        ) : filteredCustomers.length > 0 ? (
          filteredCustomers.map(({ uuid, name, contact, email }: ICustomer) => {
            return (
              <CardCustomerHistory
                key={uuid}
                uuid={uuid}
                name={name}
                contact={contact}
                email={email}
              />
            );
          })
        ) : (
          <span>Nenhum orçamento criado até o momento</span>
        )}
      </motion.div>
    </ContainerCustomertHistory>
  );
};
