"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatbotButton from "@/components/ChatbotButton"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { ArrowRight, Lightbulb } from "lucide-react"

// Sample data for charts
const budgetData = [
  { name: "Housing", value: 1200, color: "#0ea5e9" },
  { name: "Food", value: 500, color: "#f97316" },
  { name: "Transportation", value: 300, color: "#10b981" },
  { name: "Utilities", value: 200, color: "#8b5cf6" },
  { name: "Entertainment", value: 150, color: "#ec4899" },
  { name: "Savings", value: 650, color: "#f59e0b" },
  { name: "Other", value: 200, color: "#6b7280" },
]

const monthlyData = [
  { month: "Jan", income: 3000, expenses: 2400 },
  { month: "Feb", income: 3000, expenses: 2600 },
  { month: "Mar", income: 3200, expenses: 2800 },
  { month: "Apr", income: 3200, expenses: 2700 },
  { month: "May", income: 3500, expenses: 2900 },
  { month: "Jun", income: 3500, expenses: 3000 },
]

const budgetingTips = [
  "Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.",
  "Track every expense for a month to identify spending patterns.",
  "Set up automatic transfers to your savings account on payday.",
  "Review and cancel unused subscriptions to reduce monthly expenses.",
  "Use cash for discretionary spending to make your budget more tangible.",
]

export default function Budgeting() {
  const [income, setIncome] = useState(3500)
  const [expenses, setExpenses] = useState(2850)
  const [tipIndex, setTipIndex] = useState(0)

  // Calculate remaining money
  const remaining = income - expenses

  // Rotate tips every 10 seconds
  useState(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % budgetingTips.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ChatbotButton />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-8">Budgeting</h1>

          {/* Budget Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 animate-slide-up">
              <h2 className="text-xl font-semibold text-primary-800 mb-4">Expense Breakdown</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-xl font-semibold text-primary-800 mb-4">Monthly Comparison</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#0ea5e9" />
                    <Bar dataKey="expenses" name="Expenses" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Expense Tracker */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Expense Tracker</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-4">
                  <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Income
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="income"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="input-field pl-8"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="expenses" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="expenses"
                      value={expenses}
                      onChange={(e) => setExpenses(Number(e.target.value))}
                      className="input-field pl-8"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Remaining:</span>
                    <span className={`font-bold ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${remaining.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Savings Rate:</span>
                    <span className="font-bold text-primary-600">
                      {income > 0 ? ((remaining / income) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-600 animate-pulse-light">
                  <div className="flex items-start">
                    <Lightbulb className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-primary-800 mb-1">Budgeting Tip</h3>
                      <p className="text-gray-600 text-sm">{budgetingTips[tipIndex]}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <button className="btn-primary">Set Monthly Budget</button>
                  <button className="btn-secondary">View Past Budgets</button>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Categories */}
          <div className="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Expense Categories</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Budget
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Spent
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Remaining
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {budgetData.map((category, index) => {
                    const budget = category.value * 1.2 // Just for demo
                    const spent = category.value
                    const remaining = budget - spent
                    const percentage = (spent / budget) * 100

                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${budget.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${spent.toFixed(2)}</td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ${remaining.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${percentage > 90 ? "bg-red-600" : percentage > 70 ? "bg-yellow-600" : "bg-green-600"}`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <button className="btn-secondary inline-flex items-center">
                Add New Category
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

