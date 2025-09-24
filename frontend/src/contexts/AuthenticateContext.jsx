import { useEffect, useState, createContext, useContext} from "react";

function getRefreshToken() {
    return localStorage.getItem("refresh");
}

function setLocalRefreshToken(refreshToken) {
    localStorage.setItem("refresh", refreshToken);
}

const InternalContext = createContext();

export function AuthenticateContext({ children }) {
    const [accessToken, setAcessToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isNewUser, setIsNewUser] = useState(false);
    
    function setTokens(tokenPair) {
        setAcessToken(tokenPair.access);
        setLocalRefreshToken(tokenPair.refresh)
        setIsAuthenticated(true)
    }
    
    async function refreshAccessToken() {
        setIsInitialLoading(true);

        const refreshToken = getRefreshToken()
        if (!refreshToken){
            setIsInitialLoading(false)
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
            setIsInitialLoading(false);
        }
    }
    
    async function register(name, email, password) {
        setIsInitialLoading(true);
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
            setIsInitialLoading(false);
        }
    }
    
    async function login(email, password) {
        setIsInitialLoading(true);
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
            setIsInitialLoading(false);
        }
    }
    
    async function logout() {
        setIsAuthenticated(false);
        setLocalRefreshToken("");
        setAcessToken("");
    }
    
    useEffect(() => {
        async function checkAuthentication() {
            let token = await refreshAccessToken()
        }
        setIsInitialLoading(false);
        checkAuthentication();
    }, [])

    const contextValue = {
        accessToken,
        isAuthenticated,
        isInitialLoading,
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