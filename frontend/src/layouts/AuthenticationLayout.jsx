import {Navigate, Outlet} from "react-router-dom"
import {useAuthenticate} from "contexts/AuthenticateContext"

export default function AuthenticationLayout() {
    const { isAuthenticated, isLoading } = useAuthenticate();

    if (isAuthenticated && !isLoading) {
        return <Outlet />
    } else if (!isLoading) {
        return <Navigate to="/login" />
    }
}