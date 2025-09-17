import { Link, Navigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useAuthenticate } from "contexts/AuthenticateContext";
import Input from "components/form/input/Input";
import FormContainer from "components/form/formContainer/FormContainer";
import styles from "./Login.module.css"
import Button from "components/button/Button";

export default function Login({}) {
    const { isAuthenticated, login } = useAuthenticate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    
    async function handleLogin(event) {
        event.preventDefault()
        let response = await login(email, password);
    }
    
    if (!isAuthenticated) {
        return(
            <div className={styles.external}>
                <FormContainer className={styles.container}>            
                    <h1 className={styles.header}>Login</h1>
                    <form className={styles.form}>
                        <Input
                            label={"Email"}
                            className={styles.inputContainer}
                            type="text" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailInputRef}
                        />
                        <Input
                            label={"Password"}
                            className={styles.inputContainer}
                            type="password"
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            ref={passwordInputRef}
                        />
                        <Button 
                            className={styles.button}
                            onClick={handleLogin}
                        > Login</Button>
                    </form>
        
                    <Link
                        className={styles.link} 
                        to="/register"
                    >
                        Não tem conta?
                    </Link>
                </FormContainer>
            </div>
        )
    } else {
        return <Navigate to="/dashboard" />
    }
}