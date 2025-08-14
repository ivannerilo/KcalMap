import { Link, Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import styles from "./Login.module.css";

export default function Login({}) {
    // --- SUA LÓGICA (INTACTA) ---
    const { isAuthenticated, login } = useAuthenticate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    
    async function handleLogin(event) {
        event.preventDefault();
        console.log(`email: ${email} password: ${password}`);
        let response = await login(email, password);
        console.log(response);
    }
    // --- FIM DA SUA LÓGICA ---
    
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    // --- NOVA ESTRUTURA JSX ---
    return (
        <main className={styles.external}>
            <div className={styles.container}>
                <h1 className={styles.header}>Login</h1>
                
                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className={styles.input}
                            type="email" 
                            placeholder="seu@email.com" 
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailInputRef}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            className={styles.input}
                            type="password" 
                            placeholder="********" 
                            onChange={(e) => setPassword(e.target.value)} 
                            ref={passwordInputRef}
                            required
                        />
                    </div>
                    
                    <button type="submit" className={styles.button}>
                        Entrar
                    </button>
                </form>
    
                <Link className={styles.link} to="/register">
                    Não tem conta? Crie uma agora!
                </Link>
            </div>
        </main>
    );
}
