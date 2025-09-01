import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticate } from "../../contexts/AuthenticateContext";


export default function ProfileFormWrapper() {

    const { isNewUser, setIsNewUser } = useAuthenticate()

    console.log(`User entrou no profile form e é ${isNewUser} newUSer`)
    if (isNewUser) {
        console.log("É new user e setamos para falso")
        return <Outlet />
    } else {
        return <Navigate to={"/"} />
    }


}