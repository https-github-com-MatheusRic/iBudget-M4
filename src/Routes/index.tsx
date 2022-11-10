import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import PageDashboardBudget from "../pages/PageDashboardBudget";
import PageDashboardCustomer from "../pages/PageDashboardCustomer";
import { useUserContext } from "../contexts/UserContext";

const RoutesMain = () => {
  const { isAuthenticated } = useUserContext();
  const token = localStorage.getItem("@token");

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route
        path="/dashboard/customers"
        element={
          isAuthenticated ? (
            <PageDashboardCustomer />
          ) : token !== null ? (
            <PageDashboardCustomer />
          ) : (
            <Navigate replace to="/home" />
          )
        }
      />
      <Route
        path="/dashboard/customer/budgets"
        element={<PageDashboardBudget />}
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default RoutesMain;
