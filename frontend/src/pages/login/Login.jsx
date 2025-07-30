import { Link, Navigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import styles from "./Login.module.css"

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
            <div className={styles.extarnal}>
                <div className={styles.container}>            
                    <h1 className={styles.header}>Login!!!</h1>
                    <form className={styles.form}>
                        <input
                            className={styles.input}
                            type="text" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailInputRef}
                        />
                        <input
                            className={styles.input}
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            ref={passwordInputRef}
                        />
                        <button 
                            className={styles.button}
                            onClick={handleLogin}
                        > Log in!</button>
                    </form>
        
                    <Link
                        className={styles.link} 
                        to="/register"
                    >
                        Não tem conta?
                    </Link>
                </div>
            </div>
        )
    } else {
        return <Navigate to="/" />
    }
}