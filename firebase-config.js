
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7kIw_bWAATFikBPWn-6a7QVvkUFsIEvs",
  authDomain: "pelets-af6eb.firebaseapp.com",
  projectId: "pelets-af6eb",
  storageBucket: "pelets-af6eb.appspot.com",
  messagingSenderId: "26453888497",
  appId: "1:26453888497:web:e51f0ff4fd31286f81c850",
  measurementId: "G-8GML1KJM4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

