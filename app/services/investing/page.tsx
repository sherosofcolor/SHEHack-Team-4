"use client"

import { useState } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatbotButton from "@/components/ChatbotButton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { HelpCircle, AlertCircle } from "lucide-react"

// Sample data for investment chart
const investmentData = [
  { year: 2023, conservative: 10500, moderate: 11000, aggressive: 11500 },
  { year: 2024, conservative: 11025, moderate: 12100, aggressive: 13225 },
  { year: 2025, conservative: 11576, moderate: 13310, aggressive: 15209 },
  { year: 2026, conservative: 12155, moderate: 14641, aggressive: 17490 },
  { year: 2027, conservative: 12763, moderate: 16105, aggressive: 20114 },
  { year: 2028, conservative: 13401, moderate: 17716, aggressive: 23131 },
  { year: 2029, conservative: 14071, moderate: 19487, aggressive: 26600 },
  { year: 2030, conservative: 14775, moderate: 21436, aggressive: 30590 },
]

const investmentTypes = [
  {
    title: "Stocks",
    description: "Shares of ownership in a company that can be bought and sold on stock exchanges.",
    riskLevel: "Moderate to High",
    potentialReturn: "7-10% annually (historical average)",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Bonds",
    description: "Loans made to a company or government that pay interest over time and return principal at maturity.",
    riskLevel: "Low to Moderate",
    potentialReturn: "2-5% annually",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Mutual Funds",
    description:
      "Professionally managed investment funds that pool money from many investors to buy stocks, bonds, or other assets.",
    riskLevel: "Varies by fund type",
    potentialReturn: "5-8% annually (balanced funds)",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "ETFs",
    description:
      "Exchange-Traded Funds that track an index, sector, commodity, or other asset and can be purchased or sold on a stock exchange.",
    riskLevel: "Varies by ETF type",
    potentialReturn: "Varies by underlying assets",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Real Estate",
    description: "Property investments that can generate rental income and appreciate in value over time.",
    riskLevel: "Moderate",
    potentialReturn: "8-12% annually (including rental income and appreciation)",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Investing() {
  const [riskScore, setRiskScore] = useState(5)
  const [riskProfile, setRiskProfile] = useState("Moderate")
  const [selectedInvestment, setSelectedInvestment] = useState(null)

  const handleRiskCalculation = (e) => {
    e.preventDefault()
    const score = Number.parseInt(riskScore)
    let profile = "Moderate"

    if (score <= 3) {
      profile = "Conservative"
    } else if (score >= 8) {
      profile = "Aggressive"
    }

    setRiskProfile(profile)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ChatbotButton />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-8">Investing</h1>

          {/* Investing Basics */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up">
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Investing Basics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentTypes.map((investment, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedInvestment(investment)}
                >
                  <Image
                    src={investment.image || "/placeholder.svg"}
                    alt={investment.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary-700 mb-2">{investment.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{investment.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Risk: {investment.riskLevel}</span>
                      <span className="text-primary-600">Learn More</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedInvestment && (
              <div className="mt-8 p-6 bg-primary-50 rounded-xl animate-slide-up">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">{selectedInvestment.title}</h3>
                  <button onClick={() => setSelectedInvestment(null)} className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{selectedInvestment.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-sm text-gray-500">Risk Level</span>
                    <p className="font-medium text-primary-700">{selectedInvestment.riskLevel}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-sm text-gray-500">Potential Return</span>
                    <p className="font-medium text-primary-700">{selectedInvestment.potentialReturn}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-primary-600">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p>Past performance is not indicative of future results. All investments involve risk.</p>
                </div>
              </div>
            )}
          </div>

          {/* Risk Calculator */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Risk Tolerance Calculator</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form onSubmit={handleRiskCalculation}>
                  <div className="mb-6">
                    <label htmlFor="risk-score" className="block text-sm font-medium text-gray-700 mb-2">
                      On a scale of 1-10, how comfortable are you with investment risk?
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">Low Risk (1)</span>
                      <input
                        type="range"
                        id="risk-score"
                        min="1"
                        max="10"
                        value={riskScore}
                        onChange={(e) => setRiskScore(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm text-gray-500 ml-3">High Risk (10)</span>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-lg font-medium text-primary-600">{riskScore}</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button type="submit" className="btn-primary">
                      Calculate Risk Profile
                    </button>
                  </div>
                </form>

                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <h3 className="font-medium text-primary-800 mb-2">
                    Your Risk Profile: <span className="text-primary-600">{riskProfile}</span>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {riskProfile === "Conservative" &&
                      "You prefer stability and are more concerned with protecting your investment than seeking high returns. Consider bonds, CDs, and conservative mutual funds."}
                    {riskProfile === "Moderate" &&
                      "You're willing to accept some risk for potentially higher returns. A balanced portfolio of stocks, bonds, and mutual funds may be appropriate."}
                    {riskProfile === "Aggressive" &&
                      "You're comfortable with higher risk for potentially higher returns. Consider a portfolio weighted toward stocks, growth funds, and alternative investments."}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">Potential Growth of $10,000 Investment</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={investmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, ""]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="conservative"
                        name="Conservative"
                        stroke="#0ea5e9"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="moderate" name="Moderate" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                      <Line
                        type="monotone"
                        dataKey="aggressive"
                        name="Aggressive"
                        stroke="#f97316"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <HelpCircle className="h-4 w-4 mr-2 text-primary-600" />
                  <p>
                    This chart shows potential growth based on historical average returns: Conservative (5%), Moderate
                    (10%), and Aggressive (15%).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Progress Tracker */}
          <div className="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Investment Progress Tracker</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Investment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Initial Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Current Value
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Return
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: "S&P 500 Index Fund", type: "ETF", initial: 5000, current: 5750, return: 15 },
                    { name: "Tech Growth Fund", type: "Mutual Fund", initial: 3000, current: 3450, return: 15 },
                    { name: "Corporate Bond Fund", type: "Bond", initial: 2000, current: 2080, return: 4 },
                  ].map((investment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {investment.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investment.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${investment.initial.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${investment.current.toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${investment.return >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {investment.return}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center">
              <button className="btn-primary mr-4">Add New Investment</button>
              <button className="btn-secondary">View Detailed Reports</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

