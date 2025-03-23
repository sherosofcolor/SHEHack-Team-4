"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatbotButton from "@/components/ChatbotButton"
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingDown, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react"

// Sample data for debt breakdown
const debtData = [
  { name: "Credit Card", value: 5000, color: "#f97316" },
  { name: "Student Loan", value: 15000, color: "#0ea5e9" },
  { name: "Car Loan", value: 8000, color: "#8b5cf6" },
  { name: "Personal Loan", value: 3000, color: "#10b981" },
]

// Sample data for credit score factors
const creditFactors = [
  { name: "Payment History", percentage: 35, score: "Good", color: "#10b981" },
  { name: "Credit Utilization", percentage: 30, score: "Fair", color: "#f59e0b" },
  { name: "Length of Credit", percentage: 15, score: "Good", color: "#10b981" },
  { name: "Credit Mix", percentage: 10, score: "Excellent", color: "#0ea5e9" },
  { name: "New Credit", percentage: 10, score: "Good", color: "#10b981" },
]

export default function DebtManagement() {
  const [debtAmount, setDebtAmount] = useState(5000)
  const [interestRate, setInterestRate] = useState(18)
  const [monthlyPayment, setMonthlyPayment] = useState(200)
  const [payoffStrategy, setPayoffStrategy] = useState("avalanche")

  // Calculate months to pay off debt
  const calculateMonthsToPayoff = () => {
    const monthlyInterestRate = interestRate / 100 / 12
    let balance = debtAmount
    let months = 0

    while (balance > 0 && months < 1000) {
      balance = balance * (1 + monthlyInterestRate) - monthlyPayment
      months++
    }

    return months
  }

  const monthsToPayoff = calculateMonthsToPayoff()
  const totalPayment = monthlyPayment * monthsToPayoff
  const totalInterest = totalPayment - debtAmount

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ChatbotButton />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-8">Debt Management</h1>

          {/* Debt Overview */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up">
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Your Debt Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={debtData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: $${value}`}
                    >
                      {debtData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <div className="bg-primary-50 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-primary-800 mb-2">Total Debt</h3>
                  <p className="text-3xl font-bold text-primary-800">
                    ${debtData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  {debtData.map((debt, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: debt.color }}></div>
                        <span className="text-gray-700">{debt.name}</span>
                      </div>
                      <span className="font-medium">${debt.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <button className="btn-primary">Add New Debt</button>
                </div>
              </div>
            </div>
          </div>

          {/* Debt Payoff Calculator */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center mb-6">
              <TrendingDown className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-primary-800">Debt Payoff Calculator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="debt-amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Debt Amount
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input
                        type="number"
                        id="debt-amount"
                        value={debtAmount}
                        onChange={(e) => setDebtAmount(Number(e.target.value))}
                        className="input-field pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700 mb-1">
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="interest-rate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="input-field pr-8"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="monthly-payment" className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Payment
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input
                        type="number"
                        id="monthly-payment"
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                        className="input-field pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payoff Strategy</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          payoffStrategy === "avalanche"
                            ? "border-primary-600 bg-primary-50"
                            : "border-gray-300 hover:border-primary-300"
                        }`}
                        onClick={() => setPayoffStrategy("avalanche")}
                      >
                        <div className="flex items-center mb-1">
                          <div
                            className={`w-4 h-4 rounded-full mr-2 ${
                              payoffStrategy === "avalanche" ? "bg-primary-600" : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="font-medium">Avalanche</span>
                        </div>
                        <p className="text-xs text-gray-500">Pay highest interest rate first</p>
                      </div>

                      <div
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          payoffStrategy === "snowball"
                            ? "border-primary-600 bg-primary-50"
                            : "border-gray-300 hover:border-primary-300"
                        }`}
                        onClick={() => setPayoffStrategy("snowball")}
                      >
                        <div className="flex items-center mb-1">
                          <div
                            className={`w-4 h-4 rounded-full mr-2 ${
                              payoffStrategy === "snowball" ? "bg-primary-600" : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="font-medium">Snowball</span>
                        </div>
                        <p className="text-xs text-gray-500">Pay smallest balance first</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Payoff Summary</h3>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-1">Time to Pay Off</h4>
                      <p className="text-2xl font-bold text-primary-600">
                        {monthsToPayoff} months ({Math.floor(monthsToPayoff / 12)} years, {monthsToPayoff % 12} months)
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-1">Total Interest Paid</h4>
                      <p className="text-2xl font-bold text-primary-600">${totalInterest.toFixed(2)}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-1">Total Amount Paid</h4>
                      <p className="text-2xl font-bold text-primary-600">${totalPayment.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-sm text-primary-600">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <p>
                      {payoffStrategy === "avalanche"
                        ? "The Avalanche method saves the most money in interest."
                        : "The Snowball method provides psychological wins to stay motivated."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Score Improvement */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center mb-6">
              <CreditCard className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-primary-800">Credit Score Improvement</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-primary-800">Your Credit Score</h3>
                    <span className="text-xl font-bold text-primary-600">720</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Very Good</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <h3 className="font-medium text-primary-800 mb-3">Credit Score Factors</h3>

                <div className="space-y-4">
                  {creditFactors.map((factor, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: factor.color }}></div>
                          <span className="font-medium text-gray-700">{factor.name}</span>
                        </div>
                        <span className="text-sm" style={{ color: factor.color }}>
                          {factor.score}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ backgroundColor: factor.color, width: `${factor.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{factor.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-primary-800 mb-4">Tips to Improve Your Credit Score</h3>

                <div className="space-y-4">
                  {[
                    "Pay all bills on time, every time",
                    "Keep credit card balances below 30% of your limit",
                    "Don't close old credit accounts, even if unused",
                    "Limit applications for new credit",
                    "Check your credit report regularly for errors",
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-600">
                  <h4 className="font-medium text-primary-800 mb-2">Did you know?</h4>
                  <p className="text-gray-600 text-sm">
                    Improving your credit score from "good" to "excellent" could save you thousands of dollars in
                    interest over the life of a mortgage or auto loan.
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <button className="btn-primary">Get Your Free Credit Report</button>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Comparison Tool */}
          <div className="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Loan Comparison Tool</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Loan Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Interest Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Term
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Monthly Payment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Interest
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { type: "Personal Loan", rate: "9.99%", term: "3 years", payment: "$322", interest: "$1,592" },
                    {
                      type: "Credit Card Consolidation",
                      rate: "12.99%",
                      term: "5 years",
                      payment: "$230",
                      interest: "$3,800",
                    },
                    { type: "Home Equity Loan", rate: "5.49%", term: "10 years", payment: "$109", interest: "$3,080" },
                    { type: "401(k) Loan", rate: "4.25%", term: "5 years", payment: "$185", interest: "$1,100" },
                  ].map((loan, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.rate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.term}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.payment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.interest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button className="btn-primary">Compare New Loans</button>
              <button className="btn-secondary">View Refinancing Options</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

