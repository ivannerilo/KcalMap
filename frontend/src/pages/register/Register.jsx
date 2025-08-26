import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import {useAuthenticate} from "../../contexts/AuthenticateContext";
import styles from "./Register.module.css"
import FormContainer from "../../components/form/formContainer/FormContainer";
import Input from "../../components/form/input/Input";
import Button from "../../components/button/Button";

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
                <FormContainer className={styles.container}>            
                    <h1 className={styles.header}>Register</h1>
                    <form className={styles.form}>
                        <Input
                            label={"Name"}
                            className={styles.inputContainer}
                            type="text" 
                            placeholder="Your name here:" 
                            onChange={(e) => setName(e.target.value)}
                            ref={nameInputRef}
                        />
                        <Input
                            label={"Email"}
                            className={styles.inputContainer}
                            type="text" 
                            placeholder="e.g youremail@email.com" 
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailInputRef}
                        />
                        <Input
                            label={"Password"}
                            className={styles.inputContainer}
                            type="password"
                            placeholder="Your password here:" 
                            onChange={(e) => setPassword(e.target.value)} 
                            ref={passwordInputRef}
                        />
                        <Input
                            label={"Password Confirmation"}
                            className={styles.inputContainer}
                            type="password"
                            placeholder="Repeat your password here:" 
                            onChange={(e) => setPasswordConfirmation(e.target.value)} 
                            ref={passwordConfirmationInputRef}
                        />
                        <Button 
                            className={styles.button}
                            onClick={handleRegister}
                        > Register</Button>
                    </form>
        
                    <Link
                        className={styles.link} 
                        to="/login"
                    >
                        Já tem conta?
                    </Link>
                </FormContainer>
            </div>
    )
}