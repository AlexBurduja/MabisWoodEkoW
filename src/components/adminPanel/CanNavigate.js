import { useRouter } from 'next/router';
import React, { createContext, useContext } from 'react'
import { FirebaseAuthContext } from '../../../FirebaseAuthContext'
import Loading from '../reusableComponents/Loading';


export const AdminCanNavigate = React.createContext();

function CanNavigate({children}) {
    
    const {conditional} = useContext(FirebaseAuthContext)

    if (!conditional.admin) {
        return (
            <div style={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  height: '100vh', maxHeight:'250px', gap:'20px', color: 'red'}}>
                <p>
                    You are not allowed to access this page.
                </p>
            
                <button style={{padding: '10px 5px', border: '2px solid black', cursor:'pointer' }} onClick={() => window.location.href = '/'}>
                    Go back to the homepage
                </button>
            </div>
        );
    }

    return (
    <AdminCanNavigate.Provider value={true}>
        {children}
    </AdminCanNavigate.Provider>
    )
}

export default CanNavigate
