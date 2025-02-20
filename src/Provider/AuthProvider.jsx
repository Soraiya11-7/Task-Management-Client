/* eslint-disable react/prop-types */

import { getAuth, GoogleAuthProvider, onAuthStateChanged,  signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

// import axios from "axios";
const auth = getAuth(app);

export const AuthProviderContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

const [user,setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [darkMode, setDarkMode] = useState(false);


const  name = 'task manager';


//signout user
const signOutUser = () => {
    setLoading(true)
    return signOut(auth);
}


//signIn with Google
const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, provider).finally(() => setLoading(false));;
}

useEffect(() =>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser)
        setLoading(false)
        })
        return () => {
            unSubscribe();
        }

} ,[]);

const authInfo = {
    name,
    user,
    darkMode, 
    setDarkMode,
    loading,
    setLoading,
    setUser,
    signInWithGoogle,
    signOutUser,
}
    return (
        <AuthProviderContext.Provider value={authInfo}>
            {children}
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;