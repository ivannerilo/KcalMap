import { Link, Navigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import styles from "./Login.module.css"
import Input from "../../components/input/Input";

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
        <main className={styles.external}>

            <h1 className={styles.header}>Seja bem vindo(a) ao Cal Race</h1>

            <div className={styles.container}>            
                <form className={styles.form}>
                    <Input
                        label={"Email:"}
                        name={"email"}
                        containerAttributes={{ style: { width: "100%" }}} 
                        className={styles.input}
                        type="text" 
                        placeholder={"email@email.com"}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={emailInputRef} 
                    />
                    <Input
                        label={"Password:"}
                        name={"password"}
                        containerAttributes={{ style: { width: "100%" }}} 
                        className={styles.input}
                        type="password" 
                        placeholder={"Your password here:"}
                        onChange={(e) => setPassword(e.target.value)} 
                        ref={passwordInputRef} 
                    />
                    <button 
                        className={styles.button}
                        onClick={handleLogin}
                    >Login</button>
                </form>
    
                <span className={styles.link}>
                    {"Não tem conta? "}
                    <Link 
                        to="/register"
                    >
                    {"Registre-se!"}
                    </Link>
                </span>
            </div>
        </main>
    )
    } else {
        return <Navigate to="/" />
    }
}