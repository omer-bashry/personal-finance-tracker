import { Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import useFinance from "../../logic/hooks/useFinance";

export default function DashboardHeader() {
  const { openDialog } = useFinance();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Finance Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome back! Here's what's happening ...</p>
      </div>
      <Button onClick={openDialog} className="w-full sm:w-auto justify-center">
        <Plus size={18} />
        Add Transaction
      </Button>
    </div>
  );
}
