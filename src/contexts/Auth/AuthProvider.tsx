import React, {createContext, useState} from 'react'
import { User } from '../../types/User'
import { useApi } from '../../hooks/useApi'
import { AuthContext } from './AuthContext'        


export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<User | null>(null)
    const api = useApi()

    const signIn = async (email: string, password: string) => {
        const data = await api.signIn(email, password)
        if(data.user && data.token) {
            setUser(data.user)
            localStorage.setItem('token', data.token)
            return true
        }
        return false
    }

    const signOut = async () => {
        await api.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}