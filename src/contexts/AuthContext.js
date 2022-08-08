import React, { useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase"
import { getUserData } from "../services/firestore";
import LoadingSpinner from "../components/LoadingSpinner"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loginUserData, setLoginUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }
    
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(newPassword) {
        return currentUser.updatePassword(newPassword)
    }

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            function cb(data){
                setCurrentUser(user)
                setLoginUserData(data)
                setLoading(false)
            }
            if (user) getUserData(user.uid, cb)
            else setLoading(false)
        })  // remove observer

        return unSubscribe
    }, [])

    const value = {
        currentUser,
        loginUserData,
        login,
        signUp,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {loading === false
            ? children
            : <LoadingSpinner/>}
        </AuthContext.Provider>
    )

}