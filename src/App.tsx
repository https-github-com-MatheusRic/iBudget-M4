import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./contexts/UserContext";
import { BudgetProvider } from "./contexts/BudgetContext";
import { CustomerProvider } from "./contexts/CustomersContext";

import GlobalStyle from "./styles/global";
import Routes from "./Routes/index";

function App() {
  return (
    <>
      <UserProvider>
        <BudgetProvider>
          <CustomerProvider>
            <GlobalStyle />
            <ToastContainer
              position="bottom-right"
              hideProgressBar={true}
              newestOnTop={false}
              pauseOnFocusLoss
              autoClose={3000}
              theme={"dark"}
              pauseOnHover
              closeOnClick
              rtl={false}
              draggable
              limit={2}
            />
            <Routes />
          </CustomerProvider>
        </BudgetProvider>
      </UserProvider>
    </>
  );
}

export default App;
