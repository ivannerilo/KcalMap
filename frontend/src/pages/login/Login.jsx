import { Link, Navigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useAuthenticate } from "../../contexts/AuthenticateContext";

export default function Login({}) {
    const { isAuthenticated, login } = useAuthenticate();



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    
    async function handleLogin(event) {
        event.preventDefault()
        console.log(`email: ${email} password: ${password}`);
        let response = await login(email, password);
        console.log(response)
    }
    
    if (!isAuthenticated) {
        return(
            <div>            
                <h1>Login!!!</h1>
                <form>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} ref={emailInputRef}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} ref={passwordInputRef}/>
                    <button onClick={handleLogin}>Log in!</button>
                </form>
    
                <Link to="/register">
                    Não tem conta?
                </Link>
            </div>
        )
    } else {
        return <Navigate to="/" />
    }
}