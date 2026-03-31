import { useState } from "react";
import { Expense } from "../types";

export function useFinance() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  function addExpense(title: string, amount: number) {
    if (!title || !amount) return;

    const newExpense: Expense = {
      id: String(Date.now()),
      title,
      amount,
      date: new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return {
    expenses,
    addExpense,
    removeExpense,
    total,
  };
}