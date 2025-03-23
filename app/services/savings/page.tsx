"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatbotButton from "@/components/ChatbotButton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calculator, Target, Sparkles } from "lucide-react"

export default function Savings() {
  const [targetAmount, setTargetAmount] = useState(10000)
  const [currentAmount, setCurrentAmount] = useState(2000)
  const [months, setMonths] = useState(24)

  // Calculate monthly savings required
  const monthlySavingsRequired = (targetAmount - currentAmount) / months

  // Calculate progress percentage
  const progressPercentage = (currentAmount / targetAmount) * 100

  // Generate data for 52-week savings challenge
  const generateWeeklySavingsData = () => {
    const data = []
    let total = 0

    for (let week = 1; week <= 52; week++) {
      const amount = week * 5 // $5 increment per week
      total += amount

      data.push({
        week,
        amount,
        total,
      })
    }

    return data
  }

  const weeklySavingsData = generateWeeklySavingsData()

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ChatbotButton />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-8">Savings Planner</h1>

          {/* Savings Goal Tracker */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up">
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Savings Goal Tracker</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-4">
                  <label htmlFor="target-amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Target Amount
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="target-amount"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(Number(e.target.value))}
                      className="input-field pl-8"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="current-amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Amount Saved
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="current-amount"
                      value={currentAmount}
                      onChange={(e) => setCurrentAmount(Number(e.target.value))}
                      className="input-field pl-8"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="months" className="block text-sm font-medium text-gray-700 mb-1">
                    Months to Goal
                  </label>
                  <input
                    type="number"
                    id="months"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="input-field"
                  />
                </div>

                <div className="p-4 bg-primary-50 rounded-lg">
                  <h3 className="font-medium text-primary-800 mb-2">Monthly Savings Required</h3>
                  <p className="text-2xl font-bold text-primary-600">${monthlySavingsRequired.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    To reach your goal of ${targetAmount.toLocaleString()} in {months} months
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-primary-800 mb-4">Progress to Goal</h3>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      ${currentAmount.toLocaleString()} of ${targetAmount.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-primary-600">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-primary-600 h-4 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-primary-600 mr-2" />
                    <h4 className="font-medium text-gray-700">Target Date</h4>
                  </div>
                  <p className="text-lg font-semibold text-primary-800 mt-1">
                    {new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button className="btn-primary">Adjust My Savings Goal</button>
                  <button className="btn-secondary">View Savings Tips</button>
                </div>
              </div>
            </div>
          </div>

          {/* 52-Week Savings Challenge */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center mb-6">
              <Sparkles className="h-6 w-6 text-accent-500 mr-2" />
              <h2 className="text-xl font-semibold text-primary-800">52-Week Savings Challenge</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  The 52-Week Savings Challenge is a fun and effective way to build your savings habit. Each week, you
                  save $5 more than the previous week. By the end of the year, you'll have saved $6,890!
                </p>

                <div className="bg-accent-50 border-l-4 border-accent-500 p-4 rounded-r-lg mb-6">
                  <h3 className="font-medium text-accent-800 mb-1">How it works:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Week 1: Save $5</li>
                    <li>Week 2: Save $10</li>
                    <li>Week 3: Save $15</li>
                    <li>And so on until Week 52: Save $260</li>
                  </ul>
                </div>

                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-primary-800">Total Savings</h3>
                    <span className="text-xl font-bold text-primary-600">$6,890</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Track your progress weekly and watch your savings grow exponentially!
                  </p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklySavingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" label={{ value: "Week", position: "insideBottomRight", offset: -5 }} />
                    <YAxis label={{ value: "Total Savings ($)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="Cumulative Savings"
                      stroke="#0ea5e9"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="btn-accent">Start the Challenge</button>
            </div>
          </div>

          {/* Emergency Fund Calculator */}
          <div className="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center mb-6">
              <Calculator className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-primary-800">Emergency Fund Calculator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  An emergency fund is your financial safety net for unexpected expenses or income loss. Financial
                  experts recommend having 3-6 months of essential expenses saved.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="monthly-housing" className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Housing (rent/mortgage)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input type="number" id="monthly-housing" defaultValue={1500} className="input-field pl-8" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="monthly-utilities" className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Utilities
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input type="number" id="monthly-utilities" defaultValue={300} className="input-field pl-8" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="monthly-food" className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Food
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input type="number" id="monthly-food" defaultValue={500} className="input-field pl-8" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="monthly-other" className="block text-sm font-medium text-gray-700 mb-1">
                      Other Essential Expenses
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input type="number" id="monthly-other" defaultValue={700} className="input-field pl-8" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="btn-primary">Calculate Emergency Fund</button>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Recommended Emergency Fund</h3>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-1">3-Month Fund</h4>
                      <p className="text-2xl font-bold text-primary-600">$9,000</p>
                      <p className="text-sm text-gray-500">Minimum recommended</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-primary-500">
                      <h4 className="font-medium text-gray-700 mb-1">6-Month Fund</h4>
                      <p className="text-2xl font-bold text-primary-600">$18,000</p>
                      <p className="text-sm text-gray-500">Ideal for most situations</p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-1">12-Month Fund</h4>
                      <p className="text-2xl font-bold text-primary-600">$36,000</p>
                      <p className="text-sm text-gray-500">Extra security for variable income</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

