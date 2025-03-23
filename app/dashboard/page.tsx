"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatbotButton from "@/components/ChatbotButton"
import type { Transaction } from "@/types"
import { getTransactions, addTransaction, deleteTransaction, initializeDefaultData } from "../../lib/storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, DollarSign, Wallet, PiggyBank, TrendingUp, Calendar, Trash2 } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Pie, Bar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Define expense categories
const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Personal Care",
  "Education",
  "Travel",
  "Other",
]

// Define income categories
const INCOME_CATEGORIES = ["Salary", "Freelance", "Business", "Investments", "Rental", "Gifts", "Other"]

// Define savings categories
const SAVINGS_CATEGORIES = [
  "Emergency Fund",
  "Retirement",
  "Investment",
  "Education",
  "Home Purchase",
  "Vacation",
  "Other",
]

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense",
  })
  const [activeTab, setActiveTab] = useState("expense")
  const [dateRange, setDateRange] = useState("month") // 'week', 'month', 'year'
  const [summaryData, setSummaryData] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
    balance: 0,
  })

  useEffect(() => {
    initializeDefaultData()
    const loadedTransactions = getTransactions()
    setTransactions(loadedTransactions)
    calculateSummary(loadedTransactions)
  }, [])

  const calculateSummary = (txns: Transaction[]) => {
    const summary = txns.reduce(
      (acc, txn) => {
        if (txn.type === "income") {
          acc.income += txn.amount
        } else if (txn.type === "expense") {
          acc.expenses += txn.amount
        } else if (txn.type === "savings") {
          acc.savings += txn.amount
        }
        return acc
      },
      { income: 0, expenses: 0, savings: 0, balance: 0 },
    )

    summary.balance = summary.income - summary.expenses - summary.savings
    setSummaryData(summary)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setForm({ ...form, type: value, category: "" })
  }

  const handleAddTransaction = () => {
    if (!form.description || !form.amount || !form.category) return

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      date: new Date(),
      description: form.description,
      amount: Number.parseFloat(form.amount),
      category: form.category,
      type: form.type as "income" | "expense" | "savings",
    }

    const updated = addTransaction(newTransaction)
    setTransactions(updated)
    calculateSummary(updated)
    setForm({ description: "", amount: "", category: "", type: activeTab })
  }

  const handleDelete = (id: string) => {
    const updated = deleteTransaction(id)
    setTransactions(updated)
    calculateSummary(updated)
  }

  // Filter transactions based on date range
  const getFilteredTransactions = () => {
    const now = new Date()
    const startDate = new Date()

    if (dateRange === "week") {
      startDate.setDate(now.getDate() - 7)
    } else if (dateRange === "month") {
      startDate.setMonth(now.getMonth() - 1)
    } else if (dateRange === "year") {
      startDate.setFullYear(now.getFullYear() - 1)
    }

    return transactions.filter((txn) => new Date(txn.date) >= startDate)
  }

  // Prepare data for expense categories pie chart
  const getExpenseCategoryData = () => {
    const filteredTransactions = getFilteredTransactions()
    const categoryTotals: Record<string, number> = {}

    filteredTransactions.forEach((txn) => {
      if (txn.type === "expense") {
        if (!categoryTotals[txn.category]) {
          categoryTotals[txn.category] = 0
        }
        categoryTotals[txn.category] += txn.amount
      }
    })

    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#8AC926",
            "#1982C4",
            "#6A4C93",
            "#F15BB5",
          ],
          borderWidth: 1,
        },
      ],
    }
  }

  // Prepare data for income vs expenses line chart
  const getIncomeExpensesData = () => {
    const filteredTransactions = getFilteredTransactions()
    const dateLabels: string[] = []
    const incomeData: number[] = []
    const expenseData: number[] = []
    const savingsData: number[] = []

    // Group by date
    const dateGroups: Record<string, { income: number; expense: number; savings: number }> = {}

    filteredTransactions.forEach((txn) => {
      const dateStr = new Date(txn.date).toLocaleDateString()
      if (!dateGroups[dateStr]) {
        dateGroups[dateStr] = { income: 0, expense: 0, savings: 0 }
      }

      if (txn.type === "income") {
        dateGroups[dateStr].income += txn.amount
      } else if (txn.type === "expense") {
        dateGroups[dateStr].expense += txn.amount
      } else if (txn.type === "savings") {
        dateGroups[dateStr].savings += txn.amount
      }
    })

    // Sort dates and prepare chart data
    Object.keys(dateGroups)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .forEach((date) => {
        dateLabels.push(date)
        incomeData.push(dateGroups[date].income)
        expenseData.push(dateGroups[date].expense)
        savingsData.push(dateGroups[date].savings)
      })

    return {
      labels: dateLabels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.1)",
          tension: 0.4,
        },
        {
          label: "Expenses",
          data: expenseData,
          borderColor: "#F44336",
          backgroundColor: "rgba(244, 67, 54, 0.1)",
          tension: 0.4,
        },
        {
          label: "Savings",
          data: savingsData,
          borderColor: "#2196F3",
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          tension: 0.4,
        },
      ],
    }
  }

  // Prepare data for monthly summary bar chart
  const getMonthlySummaryData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentYear = new Date().getFullYear()

    // Initialize data structure
    const monthlyData: Record<string, { income: number; expense: number; savings: number }> = {}
    months.forEach((month) => {
      monthlyData[month] = { income: 0, expense: 0, savings: 0 }
    })

    // Populate with transaction data
    transactions.forEach((txn) => {
      const txnDate = new Date(txn.date)
      if (txnDate.getFullYear() === currentYear) {
        const month = months[txnDate.getMonth()]
        if (txn.type === "income") {
          monthlyData[month].income += txn.amount
        } else if (txn.type === "expense") {
          monthlyData[month].expense += txn.amount
        } else if (txn.type === "savings") {
          monthlyData[month].savings += txn.amount
        }
      }
    })

    const incomeData = months.map((month) => monthlyData[month].income)
    const expenseData = months.map((month) => monthlyData[month].expense)
    const savingsData = months.map((month) => monthlyData[month].savings)

    return {
      labels: months,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(76, 175, 80, 0.7)",
        },
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: "rgba(244, 67, 54, 0.7)",
        },
        {
          label: "Savings",
          data: savingsData,
          backgroundColor: "rgba(33, 150, 243, 0.7)",
        },
      ],
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ChatbotButton />

      <div className="pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary-800 mb-8">Financial Dashboard</h1>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Income</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${summaryData.income.toFixed(2)}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span>Money In</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
              <Wallet className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${summaryData.expenses.toFixed(2)}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span>Money Out</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Savings</CardTitle>
              <PiggyBank className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${summaryData.savings.toFixed(2)}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <TrendingUp className="h-3 w-3 text-blue-500 mr-1" />
                <span>Future Growth</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${summaryData.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${summaryData.balance.toFixed(2)}
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Calendar className="h-3 w-3 text-primary-500 mr-1" />
                <span>Available Funds</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Income vs Expenses vs Savings</CardTitle>
              <div className="flex justify-end">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line
                  data={getIncomeExpensesData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => "$" + value,
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Pie
                  data={getExpenseCategoryData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || ""
                            const value = context.raw as number
                            return `${label}: $${value.toFixed(2)}`
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="p-4 mb-8">
          <CardHeader>
            <CardTitle>Monthly Summary (This Year)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar
                data={getMonthlySummaryData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => "$" + value,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Add Transaction Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">Add New Transaction</h2>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="expense" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                <Wallet className="h-4 w-4 mr-2" />
                Expense
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Income
              </TabsTrigger>
              <TabsTrigger
                value="savings"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                <PiggyBank className="h-4 w-4 mr-2" />
                Savings
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Select value={form.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeTab === "expense" &&
                      EXPENSE_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    {activeTab === "income" &&
                      INCOME_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    {activeTab === "savings" &&
                      SAVINGS_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleAddTransaction}
              className={`mt-4 ${
                activeTab === "expense"
                  ? "bg-red-600 hover:bg-red-700"
                  : activeTab === "income"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Add {activeTab === "expense" ? "Expense" : activeTab === "income" ? "Income" : "Savings"}
            </Button>
          </Tabs>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(txn.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          txn.type === "income"
                            ? "bg-green-100 text-green-800"
                            : txn.type === "expense"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        txn.type === "income"
                          ? "text-green-600"
                          : txn.type === "expense"
                            ? "text-red-600"
                            : "text-blue-600"
                      }`}
                    >
                      ${txn.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 p-0 h-auto"
                        onClick={() => handleDelete(txn.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

