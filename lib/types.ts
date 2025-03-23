// File: types.ts


  export interface Transaction {
    id: string
    date: Date
    description: string
    amount: number
    category: string
    type: "income" | "expense" | "savings"
  }
  
  
  export type BudgetCategory = {
    id: string;
    name: string;
    budget: number;
    spent: number;
    color?: string;
  };
  
  export type DebtItem = {
    id: string;
    name: string;
    amount: number;
    interestRate: number;
    minimumPayment: number;
    color?: string;
  };
  
  export type SavingsGoal = {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: Date;
  };
  
  export type UserProfile = {
    name: string;
    email: string;
  };
 
  