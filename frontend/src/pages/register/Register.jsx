import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import {useAuthenticate} from "../../contexts/AuthenticateContext";
import styles from "./Register.module.css"


export default function Register() {
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
    
    const navigate = useNavigate()
    
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

    return(
        <div className={styles.extarnal}>
            <div className={styles.container}>
                <h1 className={styles.header}>Register!!!</h1>
                <form className={styles.form}>
                    <input
                        className={styles.input}
                        type="text" 
                        placeholder="Name" 
                        onChange={(e) => setName(e.target.value)}
                        ref={nameInputRef}
                    />
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
                    <input
                        className={styles.input}
                        type="password" 
                        placeholder="Repeat your Password" 
                        onChange={(e) => setPasswordConfirmation(e.target.value)} 
                        ref={passwordConfirmationInputRef}
                    />
                    <button 
                        className={styles.button}
                        onClick={handleRegister}
                    >Register</button>
                </form>

                {errorMessage && <h3 style={{ color: "red" }}>{errorMessage}</h3>}

                <Link
                    className={styles.link}  
                    to="/login"
                >
                    Já tem conta?
                </Link>
            </div>
        </div>
    )
}