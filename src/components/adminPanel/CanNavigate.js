import { useRouter } from 'next/router';
import React, { createContext, useContext } from 'react'
import { FirebaseAuthContext } from '../../../FirebaseAuthContext'
import Loading from '../reusableComponents/Loading';


export const AdminCanNavigate = React.createContext();

function CanNavigate({children}) {
    
    const {user, conditional} = useContext(FirebaseAuthContext)

    if (!conditional.admin) {
        return (
            <p>
                You are not allowed to access this page.{' '}
                <button onClick={() => window.location.href = '/'}>
                    Go back to the homepage
                </button>
            </p>
        );
    }

    return (
    <AdminCanNavigate.Provider value={true}>
        {children}
    </AdminCanNavigate.Provider>
    )
}

export default CanNavigate
