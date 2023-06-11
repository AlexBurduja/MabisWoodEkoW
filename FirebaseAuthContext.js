import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import   { auth, db } from "./firebase-config";
import { doc, getDoc } from "@firebase/firestore";

export const FirebaseAuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    
    const [user,setUser] = useState({});
    const [conditional, setConditional] = useState([])

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });

            const getDocument = async () => {
                if (user?.uid) {
                    
                    const ref = doc(db, 'users', user.uid);
                    const document = await getDoc(ref);
                    setConditional(document.data());
                  }
            }
            getDocument()
        

        return () => {
            unsubscribe();
        }

        
    }, [user?.uid])

    return (
        <FirebaseAuthContext.Provider value={{ user, conditional }}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}