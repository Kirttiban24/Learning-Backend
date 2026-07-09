import { RouterProvider } from "react-router"
import AppRoutes from "./AppRoutes"
import "./features/shared/global.scss"
import { AuthProvider } from "./features/auth/context/auth.context.jsx"


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
