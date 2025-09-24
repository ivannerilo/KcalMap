import {Navigate, Outlet} from "react-router-dom"
import {useAuthenticate} from "contexts/AuthenticateContext"

export default function AuthenticationLayout() {
    const { isAuthenticated, isInitialLoading, isRefreshing } = useAuthenticate();

    if (isAuthenticated) {
        return <Outlet />
    } else if (!isAuthenticated && !isInitialLoading) {
        return <Navigate to="/login" />
    }
}