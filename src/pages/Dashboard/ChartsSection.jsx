import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import Card from "../../components/ui/Card";
import useFinance from "../../logic/hooks/useFinance";

export default function ChartsSection() {

  const { monthlyData, categoryData } = useFinance();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Income vs Expenses</h2>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#22C55E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400 dark:text-gray-500 text-center py-16">Add transactions to see the chart</p>
        )}
      </Card>

      <Card className="min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Expenses by Category</h2>
        {categoryData.length > 0 ? (
          <div className="flex items-center justify-center gap-6">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col gap-2">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name} ({entry.value}%)
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 dark:text-gray-500 text-center py-16">Add expenses to see the chart</p>
        )}
      </Card>
    </div>
  );
}
