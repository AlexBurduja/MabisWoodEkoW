
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { doc, getFirestore, setDoc } from "firebase/firestore"
  import { getAuth } from 'firebase/auth'
  import { getStorage } from 'firebase/storage'

  const firebaseConfig = {
    apiKey: "AIzaSyD7kIw_bWAATFikBPWn-6a7QVvkUFsIEvs",
    authDomain: "pelets-af6eb.firebaseapp.com",
    projectId: "pelets-af6eb",
    storageBucket: "pelets-af6eb.appspot.com",
    messagingSenderId: "26453888497",
    appId: "1:26453888497:web:e51f0ff4fd31286f81c850",
    measurementId: "G-8GML1KJM4Q"
  };

  let analytics;

  const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app)
    export const auth = getAuth(app)
    export const storage = getStorage(app)
// Initialize Firebase only in a browser environment
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics }


