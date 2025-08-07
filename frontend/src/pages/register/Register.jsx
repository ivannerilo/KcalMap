import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import {useAuthenticate} from "../../contexts/AuthenticateContext";
import styles from "./Register.module.css"
import Input from "../../components/input/Input"

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
        <div className={styles.external}>
            <h1 className={styles.header}>Seja bem vindo(a) ao Cal Race</h1>
            <div className={styles.container}>
                <form className={styles.form}>
                    <Input
                        className={styles.input}
                        type={"text"} 
                        placeholder={"Type here:"}
                        label={"Name:"}
                        name={"name"}
                        onChange={(e) => setName(e.target.value)}
                        ref={nameInputRef}
                        />
                    <Input
                        className={styles.input} 
                        type={"text"} 
                        placeholder={"email@email.com"}
                        label={"Email:"}
                        name={"email"}
                        onChange={(e) => setEmail(e.target.value)} 
                        ref={emailInputRef}
                        />
                    <Input
                        className={styles.input} 
                        type={"password"} 
                        placeholder={"Type here:"}
                        label={"Password:"}
                        name={"password"}
                        onChange={(e) => setPassword(e.target.value)} 
                        ref={passwordInputRef}
                    />
                    <Input
                        className={styles.input}
                        type={"password"} 
                        placeholder={"Type here:"}
                        label={"Repeat your password:"}
                        name={"passwordConfirmation"}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        style={{ border: errorMessage ? "1px solid var(--main-red-dark)" : ""}} 
                        ref={passwordConfirmationInputRef}
                    />
                    {errorMessage && <span style={{ color: "var(--main-red-dark)" }}>{errorMessage}</span>}
                    <button 
                        className={styles.button}
                        onClick={handleRegister}
                    >Register</button>
                </form>


                <Link
                    className={styles.link}  
                    to="/login"
                >
                    Já tem uma conta?
                </Link>
            </div>
        </div>
    )
}