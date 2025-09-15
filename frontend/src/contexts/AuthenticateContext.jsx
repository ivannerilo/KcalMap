import { useEffect, useState, createContext, useContext} from "react";

function getRefreshToken() {
    return localStorage.getItem("refresh");
}

function setLocalRefreshToken(refreshToken) {
    console.log("tirei do localStorage bro")
    localStorage.setItem("refresh", refreshToken);
}

const InternalContext = createContext();

export function AuthenticateContext({ children }) {
    const [accessToken, setAcessToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);

    
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
            return {ok: false, message: "You need to Register / Login"}
        }
        try {
            let response = await fetch("http://localhost:8000/api/token/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "refresh": getRefreshToken()
                })
            })
            
            const data = await response.json()
    
            if (!response.ok){
                throw Error(response.message)
            }
    
            setAcessToken(data.access);
            setIsAuthenticated(true)
            return {ok: true, token: data.access}
        } catch (e) {
            setIsAuthenticated(false)
            return {ok: false, message: e}
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
            setIsNewUser(true);
            return {ok: true, result: data.message}
        } catch (e) {
            setIsAuthenticated(false);
            return {ok: false, message: e.message}
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
                    username: email,
                    password: password
                })
            })
            
            const data = await response.json()
    
            if (!response.ok) {
               throw Error(response.message)
            }

            
            setTokens({
                access: data.access,
                refresh: data.refresh
            });
            setIsAuthenticated(true);
            return {ok: true, result: data.message}
        } catch (e) {
            setIsAuthenticated(false);
            return {ok: false, message: e.message}
        } finally {
            setIsLoading(false)
        }
    }
    
    async function logout() {
        setIsAuthenticated(false);
        setLocalRefreshToken("");
        setAcessToken("");
        window.location.reload();
    }
    
    useEffect(() => {
        async function checkAuthentication() {
            let token = await refreshAccessToken()
            setIsLoading(false)
        }
        checkAuthentication();
    }, [])

    const contextValue = {
        accessToken,
        isAuthenticated,
        isLoading,
        refreshAccessToken,
        register,
        login,
        logout,
        isNewUser,
        setIsNewUser,
    }
    
    return (
        <InternalContext.Provider value={contextValue}>
            {children}
        </InternalContext.Provider>
    )
}

export function useAuthenticate() {
    return useContext(InternalContext)
}