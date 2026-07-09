import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";


export function useAuth() {

    const context = useContext(AuthContext)

    return context
}