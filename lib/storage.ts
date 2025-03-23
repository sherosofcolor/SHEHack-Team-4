import type { Transaction, BudgetCategory, DebtItem, SavingsGoal, UserProfile } from "./types";

// Check if running in browser (Next.js safe)
const isBrowser = typeof window !== "undefined";

// Storage keys
const STORAGE_KEYS = {
  TRANSACTIONS: "finova_transactions",
  BUDGET_CATEGORIES: "finova_budget_categories",
  DEBTS: "finova_debts",
  SAVINGS_GOALS: "finova_savings_goals",
  USER_PROFILE: "finova_user_profile",
};

// Generic get
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key}`, error);
    return defaultValue;
  }
}

// Generic set
function setToStorage<T>(key: string, value: T): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}`, error);
  }
}

// Transactions
export function getTransactions(): Transaction[] {
  return getFromStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, []).map((t) => ({
    ...t,
    date: new Date(t.date),
  }));
}
export function saveTransactions(transactions: Transaction[]): void {
  setToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
}
export function addTransaction(txn: Transaction): Transaction[] {
  const txns = getTransactions();
  const updated = [...txns, txn];
  saveTransactions(updated);
  return updated;
}
export function deleteTransaction(id: string): Transaction[] {
  const txns = getTransactions().filter((t) => t.id !== id);
  saveTransactions(txns);
  return txns;
}

// Budget
export function getBudgetCategories(): BudgetCategory[] {
  return getFromStorage(STORAGE_KEYS.BUDGET_CATEGORIES, []);
}
export function saveBudgetCategories(data: BudgetCategory[]) {
  setToStorage(STORAGE_KEYS.BUDGET_CATEGORIES, data);
}

// Debts
export function getDebts(): DebtItem[] {
  return getFromStorage(STORAGE_KEYS.DEBTS, []);
}
export function saveDebts(debts: DebtItem[]): void {
  setToStorage(STORAGE_KEYS.DEBTS, debts);
}

// Savings
export function getSavingsGoals(): SavingsGoal[] {
  return getFromStorage<SavingsGoal[]>(STORAGE_KEYS.SAVINGS_GOALS, []).map((goal) => ({
    ...goal,
    targetDate: new Date(goal.targetDate),
  }));
}
export function saveSavingsGoals(goals: SavingsGoal[]): void {
  setToStorage(STORAGE_KEYS.SAVINGS_GOALS, goals);
}

// User
export function getUserProfile(): UserProfile {
  return getFromStorage<UserProfile>(STORAGE_KEYS.USER_PROFILE, {
    name: "Jane Doe",
    email: "jane@example.com",
  });
}
export function saveUserProfile(profile: UserProfile): void {
  setToStorage(STORAGE_KEYS.USER_PROFILE, profile);
}

// Init default demo data
export function initializeDefaultData(): void {
  if (!isBrowser) return;

  if (getTransactions().length === 0) {
    const defaultTxns: Transaction[] = [
      {
        id: "t1",
        date: new Date(2023, 4, 15),
        description: "Grocery Store",
        amount: 120.45,
        category: "Food",
        type: "expense",
      },
      {
        id: "t2",
        date: new Date(2023, 4, 14),
        description: "Salary Deposit",
        amount: 2500.0,
        category: "Income",
        type: "income",
      },
    ];
    saveTransactions(defaultTxns);
  }

  if (getBudgetCategories().length === 0) {
    saveBudgetCategories([
      { id: "b1", name: "Housing", budget: 1500, spent: 1000, color: "#0ea5e9" },
      { id: "b2", name: "Food", budget: 600, spent: 400, color: "#f97316" },
    ]);
  }

  if (getDebts().length === 0) {
    saveDebts([
      { id: "d1", name: "Credit Card", amount: 5000, interestRate: 15.5, minimumPayment: 150, color: "#f97316" },
    ]);
  }

  if (getSavingsGoals().length === 0) {
    saveSavingsGoals([
      {
        id: "s1",
        name: "Emergency Fund",
        targetAmount: 10000,
        currentAmount: 2000,
        targetDate: new Date(2024, 5, 30),
      },
    ]);
  }
}
