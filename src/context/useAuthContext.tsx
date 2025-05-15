import { useUserStore } from "@/store/useUserStore"
import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
  const removeLoggedInUser = useUserStore((state) => state.removeUser)
 
  function login() {
    setAuthenticated(true)
  }

  function logout() {
    setAuthenticated(false)
    removeLoggedInUser()
  }

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated")
    if (storedAuth === "false") {
      removeLoggedInUser()
      setAuthenticated(false)
    }
    else {
      setAuthenticated(true)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString())
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error("useAuth must be within AuthContextProvider")
  }

  return context
}