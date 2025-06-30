import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import {useAuthenticate} from "../../contexts/AuthenticateContext";

export default function Register() {
    const { register, isAuthenticated } = useAuthenticate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [name, setName] = useState("");

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
        let res = await register(name, email, password);
        if (res.success) {
            console.log(res.data.message);
            clearForm();
        } 
    }

    return(
        <div>
            <h1>Register!!!</h1>
            <form>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} ref={nameInputRef}/>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} ref={emailInputRef}/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} ref={passwordInputRef}/>
                <input type="password" placeholder="Repeat your Password" onChange={(e) => setPasswordConfirmation(e.target.value)} ref={passwordConfirmationInputRef}/>

                <button onClick={handleRegister}>Register</button>
            </form>

            <Link to="/login">
                Já tem conta?
            </Link>

            <h1>A: {isAuthenticated}</h1>
        </div>
    )
}