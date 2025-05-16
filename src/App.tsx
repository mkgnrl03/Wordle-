import AuthLayout from "@/layouts/AuthLayout"
import LoginPage from "@/pages/auth/LoginPage"
import DailyWordle from "@/pages/DailyWordle"
import RegisterPage from "@/pages/auth/RegisterPage"
import MainLayout from "@/layouts/MainLayout"
import HomePage from "@/pages/user/HomePage"
import { BrowserRouter, Routes, Route } from "react-router"
import { AuthContextProvider } from "./context/useAuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {

  const queryCLient = new QueryClient()
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryCLient}>
        <AuthContextProvider>
            <Routes>

              {/* Home / Landing Page */}
              <Route path="/" element={<DailyWordle />} />

              {/* Authentication Pages */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Protected User Pages */}
              <Route element={<MainLayout />}>
                <Route path="/:userId" element={<HomePage />} />
              </Route>

            </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App