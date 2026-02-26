import { ArrowDownToLine, ArrowUpToLine, Flame, TrendingUp } from "lucide-react";
import useFinance from "../../logic/hooks/useFinance";
import Card from "../../components/ui/Card";

export default function ReportsPage() {
  const { categoryData, monthlyData, transactions } = useFinance();

  const sortedCategories = [...categoryData].sort((a, b) => b.value - a.value);
  const totalCategorySpend = sortedCategories.reduce((sum, item) => sum + item.value, 0);

  const highestExpense = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Financial Reports</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Breakdowns and insights into your spending habits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Spending Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-transparent bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-200">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-white/20 rounded-xl text-white backdrop-blur-md">
                 <TrendingUp size={24} />
               </div>
               <div>
                 <p className="text-indigo-100 text-sm font-medium">Total Spend Analyzed</p>
                 <h2 className="text-3xl font-bold text-white">${totalCategorySpend.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h2>
               </div>
             </div>
          </Card>

          <Card className="border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">Top Categories</h3>
             </div>
             <div className="p-6 space-y-5">
               {sortedCategories.length > 0 ? (
                 sortedCategories.map((cat, i) => {
                   const percentage = totalCategorySpend > 0 ? Math.round((cat.value / totalCategorySpend) * 100) : 0;
                   return (
                     <div key={cat.name}>
                       <div className="flex justify-between items-center mb-1.5 text-sm">
                         <span className="font-semibold text-gray-700 dark:text-gray-300">{cat.name}</span>
                         <span className="font-bold text-gray-900 dark:text-gray-100">${cat.value.toLocaleString()} ({percentage}%)</span>
                       </div>
                       <div className="w-full bg-gray-100 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                         <div 
                           className="h-2.5 rounded-full" 
                           style={{ 
                             width: `${percentage}%`,
                             backgroundColor: ['#4A6CF7', '#A855F7', '#EC4899', '#EF4444', '#F59E0B', '#22C55E'][i % 6]
                           }} 
                         />
                       </div>
                     </div>
                   );
                 })
               ) : (
                 <p className="text-sm text-center text-gray-400 dark:text-gray-500 py-4">Not enough data to analyze spending.</p>
               )}
             </div>
          </Card>

          {/* Highest Expense Highlight */}
          {highestExpense && (
            <Card className="p-6 border-orange-100 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/20 shadow-sm relative overflow-hidden">
              <Flame size={120} className="absolute -right-6 -bottom-6 text-orange-200 dark:text-orange-900/50 opacity-50" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <Flame size={16} />
                  Largest Expense
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-orange-50 mb-1">
                  ${highestExpense.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </h3>
                <p className="text-sm font-medium text-gray-600 dark:text-orange-200/80">
                  {highestExpense.category} <span className="text-gray-400 dark:text-orange-300/50">({new Date(highestExpense.date).toLocaleDateString()})</span>
                </p>
              </div>
            </Card>
          )}

        </div>

        {/* Right Column: Monthly Data */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
               <h3 className="font-bold text-gray-800 dark:text-gray-200">Monthly Performance</h3>
            </div>
            
            <div className="divide-y divide-gray-50 dark:divide-gray-700/50 p-0">
               {monthlyData.length > 0 ? (
                 monthlyData.slice().reverse().map((month, i) => {
                   const net = month.income - month.expenses;
                   const isPositive = net >= 0;
                   return (
                     <div key={month.month} className={"p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 " + (i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-gray-50/30 dark:bg-gray-800/30")}>
                        <div className="w-24 shrink-0">
                          <p className="font-bold text-gray-800 dark:text-gray-200">{month.month}</p>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-2 gap-4 sm:border-l sm:pl-6 border-gray-100 dark:border-gray-700">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Income</p>
                            <div className="flex items-center gap-1.5 text-green-600 font-bold">
                              <ArrowDownToLine size={14} />
                              ${month.income.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Expense</p>
                            <div className="flex items-center gap-1.5 text-red-500 font-bold">
                              <ArrowUpToLine size={14} />
                              ${month.expenses.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                            </div>
                          </div>
                        </div>

                        <div className="sm:border-l sm:pl-6 border-gray-100 dark:border-gray-700 w-28 shrink-0 sm:text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Net</p>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}>
                            {isPositive ? "+" : "-"}${Math.abs(net).toLocaleString()}
                          </span>
                        </div>
                     </div>
                   );
                 })
               ) : (
                 <div className="p-12 text-center text-gray-400">
                    Not enough data generated for monthly trends.
                 </div>
               )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
