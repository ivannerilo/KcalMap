import { Link, Navigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useAuthenticate } from "../../contexts/AuthenticateContext";

export default function Login({}) {
    const { isAuthenticated } = useAuthenticate();



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    
    function handleLogin(event) {
        event.preventDefault()
        console.log(`email: ${email} password: ${password}`);
        
        fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({      
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            emailInputRef.current.value = "";
            passwordInputRef.current.value = "";
        })
        
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