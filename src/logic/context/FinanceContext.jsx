import { createContext, useState, useEffect } from "react";
import { getTransactions, saveTransactions, deleteTransaction as deleteStorageTransaction, editTransaction as editStorageTransaction, deleteAllTransactions as deleteAllStorageTransactions } from "../services/storageService";
import { STORAGE_KEY } from "../utils/constants";
import {
  calcTotalIncome,
  calcTotalExpenses,
  calcMonthlyData,
  calcCategoryData,
} from "../utils/calculations";

export const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => getTransactions());
  

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newVal = !prev;
      localStorage.setItem(`${STORAGE_KEY}_theme`, JSON.stringify(newVal));
      return newVal;
    });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const addTransaction = (transaction) => {
    const updated = [...transactions, transaction];
    setTransactions(updated);
    saveTransactions(updated); 
    closeDialog(); 
  };
 
  const deleteTransaction = (id) => {
    const updated = deleteStorageTransaction(id);
    setTransactions(updated);
  };

  const editTransaction = (id, updatedTransaction) => {
    const updated = editStorageTransaction(id, updatedTransaction);
    setTransactions(updated);
  };
  
  const deleteAllTransactions = () => {
    deleteAllStorageTransactions();
    setTransactions([]);
  };
  
  const totalIncome = calcTotalIncome(transactions);
  const totalExpenses = calcTotalExpenses(transactions);
  const netBalance = totalIncome - totalExpenses;
  const monthlyData = calcMonthlyData(transactions);
  const categoryData = calcCategoryData(transactions);


  const value = {
    transactions,
    totalIncome,
    totalExpenses,
    netBalance,
    monthlyData,
    categoryData,
    addTransaction,
    deleteTransaction,
    editTransaction,
    deleteAllTransactions,
    isDarkMode,
    toggleDarkMode,
    isDialogOpen,
    openDialog,
    closeDialog,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}
