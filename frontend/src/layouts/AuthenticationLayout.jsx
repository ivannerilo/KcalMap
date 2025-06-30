import {Navigate, Outlet} from "react-router-dom"
import {useAuthenticate} from "../contexts/AuthenticateContext"

export default function AuthenticationLayout({}) {
    const { isAuthenticated } = useAuthenticate();

    if (isAuthenticated) {
        return(<Outlet />)
    } else {
        return <Navigate to="/login" />
    }
}