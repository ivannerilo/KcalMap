import { useAuthenticate } from "../contexts/AuthenticateContext"
import {createContext, useContext} from 'react'

const InternalContext = createContext();

export function FetchContext({ children }){
    const { accessToken, refreshAccessToken, logout } = useAuthenticate()

    async function authFetch(url, options = {}){
    
        let authHeader = {"Authorization": "Bearer " + accessToken}
    
        let response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                ...authHeader,
            }
        })
    
        if (response.status === 401){
            try {
                let newAccessToken = await refreshAccessToken()
    
                if (!newAccessToken.ok){
                    throw new Error(newAccessToken.message)
                }
    
                authHeader = {"Authorization": "Bearer " + newAccessToken}
    
                response = await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        ...authHeader,
                    }
                })
    
                return response
            } catch (error) {
                logout()
                return error
            }
        }
    
        return response
    }

    return (
        <InternalContext.Provider value={{ authFetch }}>
            {children}
        </InternalContext.Provider>
    )

}

export function useFetch() {
    return useContext(InternalContext);
}