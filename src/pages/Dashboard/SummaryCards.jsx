import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import Card from "../../components/ui/Card";
import IconCircle from "../../components/ui/IconCircle";
import useFinance from "../../logic/hooks/useFinance";

export default function SummaryCards() {
  const { totalIncome, totalExpenses, netBalance } = useFinance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <div className="flex items-center gap-4">
          <IconCircle bgColor="bg-green-100" textColor="text-green-600">
            <TrendingUp size={22} />
          </IconCircle>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              ${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <IconCircle bgColor="bg-red-100" textColor="text-red-500">
            <TrendingDown size={22} />
          </IconCircle>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              ${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <IconCircle bgColor="bg-blue-100" textColor="text-blue-600">
            <Wallet size={22} />
          </IconCircle>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Net Balance</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              ${netBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
