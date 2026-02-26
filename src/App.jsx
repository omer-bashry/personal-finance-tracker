import { Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./logic/context/FinanceContext";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import ReportsPage from "./pages/Reports/ReportsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
function App() {
  return (
    <FinanceProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </FinanceProvider>
  );
}

export default App;
