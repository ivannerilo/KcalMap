import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticate } from "../../contexts/AuthenticateContext";


export default function ProfileFormWrapper() {

    const { isNewUser, setIsNewUser } = useAuthenticate()

    if (isNewUser) {
        return <Outlet />
    } else {
        return <Navigate to={"/"} />
    }


}