import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfigStr = import.meta.env.VITE_FIREBASE_CONFIG

let firebaseConfig = null
let isConfigured = false

try {
  if (firebaseConfigStr) {
    firebaseConfig = JSON.parse(firebaseConfigStr)
    isConfigured = true
  }
} catch (e) {
  console.error("Error parsing VITE_FIREBASE_CONFIG:", e)
}

let app = null
let db = null
let auth = null

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)
  } catch (e) {
    console.error("Error initializing Firebase:", e)
    isConfigured = false
  }
}

export { app, db, auth, isConfigured }
