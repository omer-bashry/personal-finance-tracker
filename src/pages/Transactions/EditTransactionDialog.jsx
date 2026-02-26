import { useState, useEffect } from "react";
import { X } from "lucide-react";
import useFinance from "../../logic/hooks/useFinance";
import { CATEGORIES } from "../../logic/utils/constants";

export default function EditTransactionDialog({ transaction, onClose }) {
  const { editTransaction } = useFinance();

  const [type, setType] = useState(transaction?.type || "expense");
  const [amount, setAmount] = useState(transaction?.amount || "");
  const [category, setCategory] = useState(transaction?.category || "");
  const [date, setDate] = useState(transaction?.date || getTodayDate());
  const [notes, setNotes] = useState(transaction?.notes || "");

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount);
      setCategory(transaction.category === "Income" ? "" : transaction.category);
      setDate(transaction.date);
      setNotes(transaction.notes || "");
    }
  }, [transaction]);

  if (!transaction) return null;

  function handleSubmit(e) {
    e.preventDefault();

    const updatedTransaction = {
      ...transaction,
      type,
      amount: parseFloat(amount),
      category: type === "income" ? "Income" : category,
      date,
      notes,
    };

    editTransaction(transaction.id, updatedTransaction);
    onClose();
  }

  function handleCancel() {
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 transition-all">
      <div 
        className="bg-white dark:bg-gray-800 rounded-t-[2.5rem] sm:rounded-2xl w-full sm:max-w-md p-6 sm:p-8 shadow-2xl dark:shadow-gray-900/50 transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Edit Transaction</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-widest font-bold">Update Entry</p>
          </div>
          <button onClick={handleCancel} className="p-2 bg-gray-50 dark:bg-gray-700/50 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full transition cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-1.5 box-border">
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                type === "income"
                  ? "bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm scale-[1.02]"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                type === "expense"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20 scale-[1.02]"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Expense
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                Amount
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent focus:border-blue-100 dark:focus:border-blue-900 focus:bg-white dark:focus:bg-gray-800 rounded-2xl py-3.5 pl-9 pr-4 outline-none transition-all text-lg font-bold text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            {type === "expense" && (
              <div>
                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent focus:border-blue-100 dark:focus:border-blue-900 focus:bg-white dark:focus:bg-gray-800 rounded-2xl py-3.5 px-4 outline-none text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer appearance-none"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent focus:border-blue-100 dark:focus:border-blue-900 focus:bg-white dark:focus:bg-gray-800 rounded-2xl py-3.5 px-4 outline-none text-sm font-medium text-gray-700 dark:text-gray-200 focus:[color-scheme:light] dark:focus:[color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What was this for?"
                rows={2}
                className="w-full bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent focus:border-blue-100 dark:focus:border-blue-900 focus:bg-white dark:focus:bg-gray-800 rounded-2xl py-3.5 px-4 outline-none text-sm font-medium text-gray-700 dark:text-gray-200 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-3.5 rounded-2xl text-sm font-bold text-white shadow-xl transform active:scale-[0.98] transition-all cursor-pointer ${
                type === "income" 
                  ? "bg-green-600 shadow-green-100 hover:bg-green-700" 
                  : "bg-blue-600 shadow-blue-100 hover:bg-blue-700"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}
