"use client"

import { useState, useRef, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Send, User, Bot, Sparkles } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const presetQuestions = [
  "How can I create a budget?",
  "What's the best way to start investing?",
  "How do I improve my credit score?",
  "Should I pay off debt or save first?",
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm Finova's AI assistant. How can I help with your financial questions today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (content: string = input) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      let response = ""

      if (content.toLowerCase().includes("budget")) {
        response =
          "Creating a budget is a great first step! Start by tracking all your income and expenses for a month. Then, categorize your spending and look for areas to cut back. The 50/30/20 rule is a good guideline: 50% for needs, 30% for wants, and 20% for savings and debt repayment."
      } else if (content.toLowerCase().includes("invest")) {
        response =
          "For beginners, I recommend starting with a retirement account like a 401(k) or IRA. Then consider low-cost index funds which provide diversification. Remember to only invest money you won't need in the short term, and consider your risk tolerance when choosing investments."
      } else if (content.toLowerCase().includes("credit score")) {
        response =
          "To improve your credit score: 1) Pay all bills on time, 2) Keep credit card balances below 30% of your limit, 3) Don't close old accounts, 4) Limit applications for new credit, and 5) Regularly check your credit report for errors."
      } else if (content.toLowerCase().includes("debt") && content.toLowerCase().includes("save")) {
        response =
          "It's often best to do both! First, build a small emergency fund ($1,000), then focus on high-interest debt (like credit cards), while still contributing to retirement if your employer matches. Once high-interest debt is paid, build your emergency fund to 3-6 months of expenses while tackling lower-interest debt."
      } else {
        response =
          "That's a great question about personal finance. While I'm still learning, I'd recommend checking out our resources section for more detailed information on this topic. Would you like me to help with something else?"
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden h-[calc(100vh-12rem)]">
            <div className="flex flex-col h-full">
              {/* Chat header */}
              <div className="bg-primary-600 text-white p-4 flex items-center">
                <Sparkles className="h-6 w-6 mr-2" />
                <h1 className="text-xl font-semibold">Finova AI Assistant</h1>
              </div>

              {/* Messages container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                      <div
                        className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
                          message.sender === "user" ? "bg-primary-600 ml-2" : "bg-accent-500 mr-2"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-primary-600 text-white rounded-tr-none"
                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-100" : "text-gray-500"}`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent-500 mr-2">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                        <div className="flex space-x-2">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick reply buttons */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="mb-4 overflow-x-auto whitespace-nowrap pb-2">
                  <div className="inline-flex space-x-2">
                    {presetQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors duration-200 whitespace-nowrap"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input area */}
                <div className="flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your financial question..."
                    className="flex-1 input-field"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className={`ml-2 p-2 rounded-full ${
                      !input.trim() || isLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary-600 text-white hover:bg-primary-700"
                    } transition-colors duration-200`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
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

