import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import styles from "./Register.module.css";

export default function Register() {
    // --- SUA LÓGICA (INTACTA) ---
    const { register, isAuthenticated } = useAuthenticate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const passwordConfirmationInputRef = useRef(null);

    function clearForm() {
        nameInputRef.current.value = "";
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        passwordConfirmationInputRef.current.value = "";
    }
    
    const navigate = useNavigate();
    
    async function handleRegister(event) {
        event.preventDefault();
        if (email && password && passwordConfirmation && name) {
            if (password === passwordConfirmation) {
                let response = await register(name, email, password);
                if (response.ok) {
                    clearForm();
                    setErrorMessage("");
                    navigate("/profile-form");
                } else {
                    setErrorMessage(response.message);
                    clearForm();
                }
            } else {
                passwordInputRef.current.value = "";
                passwordConfirmationInputRef.current.value = "";
                setErrorMessage("You need to type the same password in both fields!");
            }
        }
    }
    // --- FIM DA SUA LÓGICA ---

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    // --- NOVA ESTRUTURA JSX ---
    return (
        <main className={styles.external}>
            <div className={styles.container}>
                <h1 className={styles.header}>Crie sua Conta</h1>
                
                <form className={styles.form} onSubmit={handleRegister}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            className={styles.input}
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={(e) => setName(e.target.value)}
                            ref={nameInputRef}
                            required
                        />
                    </div>

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
                            placeholder="Crie uma senha forte"
                            onChange={(e) => setPassword(e.target.value)}
                            ref={passwordInputRef}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="passwordConfirmation">Confirme a Senha</label>
                        <input
                            id="passwordConfirmation"
                            className={styles.input}
                            type="password"
                            placeholder="Repita a senha"
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            ref={passwordConfirmationInputRef}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Registrar
                    </button>
                </form>

                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                <Link className={styles.link} to="/login">
                    Já tem uma conta? Faça login
                </Link>
            </div>
        </main>
    );
}
