import { HeaderLogged } from "../../components/HeaderLogged";
import { useWindowSize } from "../../hooks/useWindowSize";

import { DashboardBudget } from '../../components/DashboardBudget/index';
import { DashboardBudgetMobile } from '../../components/DashboardBudgetMobile/index';

const PageDashboardBudget = () => {
  const [, width] = useWindowSize();

  return width > 1023 ? (
    <>
      <HeaderLogged />
      <DashboardBudget />
    </>
  ) : (
    <DashboardBudgetMobile />
  );
};

export default PageDashboardBudget;
