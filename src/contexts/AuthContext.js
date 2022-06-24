import React, { useContext, useEffect, useState } from "react";
import {auth} from "../services/firebase"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })  // remove observer

        return unSubscribe
    }, [])

    const value = {
        currentUser,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}