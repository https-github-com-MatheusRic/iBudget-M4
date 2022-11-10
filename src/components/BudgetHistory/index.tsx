import { motion } from "framer-motion";
import { CardBudgetHistory } from "../CardBudgetHistory";

import { IoSearch } from "react-icons/io5";
import { ContainerBudgetHistory, FilterBar } from "./style";
import { IBudget } from "../../contexts/UserContext/interfaces";
import { useState } from "react";
import { useBudgetContext } from "../../contexts/BudgetContext";

export const BudgetHistory = () => {
  const { setOnHistoric, setOnCreateBudget, budgets } = useBudgetContext();

  const [searchValue, setSearchValue] = useState<string>("");

  budgets.sort((a, b) => Number(b.uuid) - Number(a.uuid));

  const normalize = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  const filteredBudgets =
    searchValue.length > 0
      ? budgets.filter((elem) => {
          const normalizedSearch = normalize(searchValue);
          const normalizedProjectName = normalize(elem.projectName);

          return normalizedProjectName.includes(normalizedSearch);
        })
      : budgets;

  return (
    <ContainerBudgetHistory>
      <FilterBar>
        <div>
          <h2>Histórico de orçamentos</h2>
          <h2
            onClick={() => {
              setOnHistoric(false);
              setOnCreateBudget(true);
            }}
          >
            Gerar orçamento
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
          filteredBudgets.length > 0 ? (
            filteredBudgets.map(
              ({ budget, projectName, uuid, projectTime }: IBudget) => {
                return (
                  <CardBudgetHistory
                    key={uuid}
                    projectName={projectName}
                    budget={budget}
                    uuid={uuid}
                    projectTime={projectTime}
                    fixedCost=""
                    variableCost=""
                  />
                );
              }
            )
          ) : (
            <p>
              Nada encontrado para: <strong>{searchValue}</strong>
            </p>
          )
        ) : budgets.length > 0 ? (
          budgets.map(
            ({ budget, projectName, uuid, projectTime }: IBudget) => {
              return (
                <CardBudgetHistory
                  key={uuid}
                  projectName={projectName}
                  budget={budget}
                  uuid={uuid}
                  projectTime={projectTime}
                  fixedCost=""
                  variableCost=""
                />
              );
            }
          )
        ) : (
          <span>Nenhum orçamento criado até o momento</span>
        )}
      </motion.div>
    </ContainerBudgetHistory>
  );
};
