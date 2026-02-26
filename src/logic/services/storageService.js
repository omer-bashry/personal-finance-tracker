import { STORAGE_KEY } from "../utils/constants";

export function getTransactions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}


export function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}


export function addTransaction(transaction) {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
  return transactions;
}

export function deleteTransaction(id) {
  const transactions = getTransactions();
  const filtered = transactions.filter((t) => t.id !== id);
  saveTransactions(filtered);
  return filtered;
}

export function editTransaction(id, updatedTransaction) {
  const transactions = getTransactions();
  const mapped = transactions.map((t) => (t.id === id ? updatedTransaction : t));
  saveTransactions(mapped);
  return mapped;
}

export function deleteAllTransactions() {
  saveTransactions([]);
}
