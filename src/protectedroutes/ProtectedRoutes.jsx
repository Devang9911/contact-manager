import { Navigate, useNavigate } from "react-router-dom"
import { usePopup } from "../hooks/usePopup"
import { useEffect } from "react"

    const ProtectedRoutes = ({ children }) => {
        const { showPopup } = usePopup()
        const currentUser = sessionStorage.getItem("userId")
        useEffect(() => {
            if (!currentUser) {
                showPopup(
                    "Not logged in",
                    "Please login yourself",
                    "warning"
                )
            }
        }, [currentUser])

        if (!currentUser) {
            return <Navigate to="/login" replace />
        }
        return children
    }

export default ProtectedRoutes