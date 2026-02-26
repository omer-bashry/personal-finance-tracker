import { CATEGORIES, MONTH_NAMES } from "./constants";

export function calcTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calcTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calcMonthlyData(transactions) {
  const monthMap = {};
  MONTH_NAMES.forEach((name) => {
    monthMap[name] = { month: name, income: 0, expenses: 0 };
  });

  transactions.forEach((t) => {
    const monthIndex = new Date(t.date).getMonth();
    const monthName = MONTH_NAMES[monthIndex];

    if (t.type === "income") {
      monthMap[monthName].income += t.amount;
    } else {
      monthMap[monthName].expenses += t.amount;
    }
  });


  return Object.values(monthMap).filter(
    (m) => m.income > 0 || m.expenses > 0
  );
}

export function calcCategoryData(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);

  if (total === 0) return [];

  const categoryTotals = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  return CATEGORIES
    .filter((cat) => categoryTotals[cat.name])
    .map((cat) => ({
      name: cat.name,
      value: Math.round((categoryTotals[cat.name] / total) * 100),
      color: cat.color,
    }));
}
