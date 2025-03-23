"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import Link from "next/link"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl overflow-hidden animate-slide-up">
          <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Finova Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-primary-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 bg-gray-50 h-64 flex flex-col justify-center items-center">
            <p className="text-center text-gray-600 mb-4">
              Have questions about your finances? Our AI assistant is here to help!
            </p>
            <Link href="/chatbot" className="btn-primary w-full text-center">
              Start Chatting
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "bg-primary-700" : "bg-primary-600"
        } text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 animate-bounce-light`}
        aria-label="Chat with AI Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}

