"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type User = {
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem("finova_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const userData = {
      name: email.split("@")[0],
      email,
    }

    // Store in localStorage
    localStorage.setItem("finova_user", JSON.stringify(userData))
    setUser(userData)
    setIsLoading(false)
  }

  const signup = async (userData: any) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const newUser = {
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
    }

    // Store in localStorage
    localStorage.setItem("finova_user", JSON.stringify(newUser))
    setUser(newUser)
    setIsLoading(false)
  }

  const logout = () => {
    localStorage.removeItem("finova_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

