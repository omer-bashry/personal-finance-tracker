import { useState } from "react";
import { Search, Pencil, Trash2, RotateCcw } from "lucide-react";

import useFinance from "../../logic/hooks/useFinance";
import EditTransactionDialog from "./EditTransactionDialog";


const ITEMS_PER_PAGE = 10;

const CATEGORY_COLORS = {
  Groceries: "#22C55E",
  Salary: "#4A6CF7",
  Rent: "#EF4444",
  "Dining Out": "#F59E0B",
  Utilities: "#67E8F9",
  Transportation: "#A855F7",
  Entertainment: "#EC4899",
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const { transactions, deleteTransaction } = useFinance();

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const uniqueCategories = [...new Set(transactions.map((t) => t.category))].filter(Boolean);

  function resetFilters() {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setCurrentPage(1);
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Transaction History</h1>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="flex flex-1 items-center border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900 transition-all">
            <Search size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="outline-none text-sm w-full bg-transparent dark:text-white"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
              className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-gray-200 outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-gray-200 outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition cursor-pointer bg-white dark:bg-gray-800"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden mb-6 transition-colors duration-300">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
          <div className="col-span-4">Category / Description</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-2 text-center">Type</div>
          <div className="col-span-1 text-right"></div>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {pageItems.length > 0 ? (
            pageItems.map((t) => (
              <div key={t.id} className="group">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 items-center group-hover:bg-gray-50/80 dark:group-hover:bg-gray-700/30 transition-colors">
                  <div className="col-span-4 flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[t.category] || "#D1D5DB" }}
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t.category}</span>
                  </div>
                  <div className={`col-span-2 text-sm font-bold ${
                    t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                  }`}>
                    {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <div className="col-span-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(t.date)}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${
                      t.type === "income"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    }`}>
                      {t.type}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setTransactionToEdit(t)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition cursor-pointer"
                    >
                      <Pencil size={15} />
                    </button>
                    <button 
                      onClick={() => deleteTransaction(t.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="md:hidden p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: CATEGORY_COLORS[t.category] || "#D1D5DB" }}
                      />
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{t.category}</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                    }`}>
                      {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <span>{formatDate(t.date)}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className={`capitalize font-medium ${
                        t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                      }`}>{t.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setTransactionToEdit(t)}
                        className="text-gray-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="text-gray-300 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-20 text-center text-gray-400 dark:text-gray-500">
              <RotateCcw size={40} className="mx-auto mb-4 opacity-10" />
              <p className="text-sm">No transactions found matching your filters</p>
            </div>
          )}
        </div>
      </div>

      {filtered.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400 px-2">
          <span className="order-2 sm:order-1">
            Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{startIndex + 1}</span> to <span className="font-semibold text-gray-900 dark:text-gray-100">{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}</span> of <span className="font-semibold text-gray-900 dark:text-gray-100">{filtered.length}</span> entries
          </span>

          <div className="flex items-center gap-1 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw size={16} className="-rotate-90" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/20"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 text-gray-600 dark:text-gray-300 shadow-sm"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw size={16} className="rotate-90" />
            </button>
          </div>
        </div>
      )}

      {transactionToEdit && (
        <EditTransactionDialog 
          transaction={transactionToEdit} 
          onClose={() => setTransactionToEdit(null)} 
        />
      )}
    </div>
  );
}
