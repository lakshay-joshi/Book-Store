import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext=createContext();
export const useAuth=()=>{
  return useContext(AuthContext);
}
const googleProvider = new GoogleAuthProvider();
//authProvider
export const AuthProvider=({children})=>{
  const [currentUser,setCurrentUser]=useState(null);
  const [loading,setLoading]=useState(true);
  //user registration
  const registerUser=async(email, password)=>{
    return await createUserWithEmailAndPassword(auth, email, password);
  }
  const loginUser=async(email,password)=>{
    return await signInWithEmailAndPassword(auth,email,password)
  }
  //sign up with google
  const signInWithGoogle=async()=>{
    return await signInWithPopup(auth,googleProvider);
  }
  //logout
  const logout=()=>
  {
    return signOut(auth);
  }
  //Manage User
  useEffect(()=>{
    const un=onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user);
      setLoading(false);
      if(user){
        const {email,displayName,photoURL}=user;
        const userData={
          email,username:displayName,photo:photoURL
        }
    }
    })
    return ()=>un();
  },[])
  const value={
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout
  }
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}