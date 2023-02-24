// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "whatsapp-clone-b66e5.firebaseapp.com",
  projectId: "whatsapp-clone-b66e5",
  storageBucket: "whatsapp-clone-b66e5.appspot.com",
  messagingSenderId: "392226342223",
  appId: "1:392226342223:web:dce4f4ae1adb3416cf713a",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage };
