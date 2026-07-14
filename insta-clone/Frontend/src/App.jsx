import { RouterProvider } from "react-router"
import AppRoutes from "./app.routes.jsx"
import "./features/shared/global.scss"
import { AuthProvider } from "./features/auth/context/auth.context.jsx"
import { PostContextProvider } from "./features/post/context/post.context.jsx"


function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
