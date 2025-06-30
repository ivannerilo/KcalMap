/* import { useEffect, useState } from "react";

function getRefreshToken() {
    return localStorage.getItem("refresh");
}

function setLocalRefreshToken(refreshToken) {
    localStorage.setItem("refresh", refreshToken);
}

export default function useAuthenticate() {
    const [accessToken, setAcessToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    function setTokens(tokenPair) {
        setAcessToken(tokenPair.access);
        setLocalRefreshToken(tokenPair.refresh)
        setIsAuthenticated(true)
    }
    
    async function refreshAccessToken() {
        setIsLoading(true);
        const refreshToken = getRefreshToken()
        if (!refreshToken){
            setIsLoading(false)
            return
        }
        try {
            let response = await fetch("http://localhost:8000/api/token/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "refresh": getRefreshToken()
                }
            })
            
            const data = await response.json()

            if (!response.ok){
                throw Error(response.message)
            }

            setAcessToken(data.access);
            setIsAuthenticated(true)
        } catch (e) {
            setIsAuthenticated(false)
        } finally {
            setIsLoading(false)
        }
    }

    async function register(name, email, password) {
        setIsLoading(true)
        try {
            let response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            
            const data = await response.json()
    
            if (!response.ok) {
               throw Error(response.message)
            }
            setTokens(data.tokens);
            setIsAuthenticated(true);
            return {success: true, data: data}
        } catch (e) {
            setIsAuthenticated(false);
            return {success: false, message: e.message}
        } finally {
            setIsLoading(false)
        }
    }

    async function login(email, password) {
        setIsLoading(true);
        try {
            let response = await fetch("http://localhost:8000/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            
            const data = await response.json()
    
            if (!response.ok) {
               throw Error(response.message)
            }
            setTokens(data.tokens);
            setIsAuthenticated(true);
            return {success: true, data: data}
        } catch (e) {
            setIsAuthenticated(false);
            return {success: false, message: e.message}
        } finally {
            setIsLoading(true)
        }
    }

    async function logout() {
        isAuthenticated(false);
        setLocalRefreshToken("");
        setAcessToken("");
    }

    useEffect(() => {
        async function checkAuthentication() {
            await refreshAccessToken()
            setIsLoading(false)
        }
        checkAuthentication();
    }, [])

    return {accessToken, isAuthenticated, isLoading, refreshAccessToken, register, login, logout}
} */