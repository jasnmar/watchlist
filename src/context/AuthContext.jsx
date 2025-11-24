import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../lib/firebase"
import {
  onAuthStateChanged,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const loginAnonymously = () => {
    if (!auth) return
    return signInAnonymously(auth)
  }

  const loginWithGoogle = () => {
    if (!auth) return
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const logout = () => {
    if (!auth) return
    return signOut(auth)
  }

  const value = {
    currentUser,
    loginAnonymously,
    loginWithGoogle,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
