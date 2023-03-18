import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { FirebaseAuthContext } from "../../../FirebaseAuthContext";
import Loading from "../reusableComponents/Loading";
import { AdminPanelComponent } from "./AdminPanelComponent";

export function AdminPanelFetch(){
    const [users , setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUsers = async () => {
            const userDoc = collection(db, `users`)

            const data = await getDocs(userDoc)

            setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
            setLoading(false)
        }
        getUsers()

    }, []) 
    
    return (
        <>
        {loading ? <Loading /> : 
        <>
        <div className="userPageHeader">
        {localStorage.getItem('language') === 'FR' ? 
    <>
      <h1>Utilisateurs</h1>
      <h3>Ici, vous pouvez voir tous ceux qui ont créé un profil sur le site et toutes les informations concernant leur compte.</h3>
    </> :
 localStorage.getItem('language') === 'RO' ?
    <>
      <h1>Utilizatori</h1>
      <h3>Aici puteți vedea toți cei care și-au creat un profil pe site și toate informațiile despre contul lor.</h3>
    </> :
 localStorage.getItem('language') === 'DE' ?
    <>
      <h1>Benutzer</h1>
      <h3>Hier können Sie alle Personen sehen, die ein Profil auf der Website erstellt haben, sowie alle Informationen zu ihrem Konto.</h3>
    </> :
 localStorage.getItem('language') === 'IT' ?
    <>
      <h1>Utenti</h1>
      <h3>Qui puoi vedere tutti coloro che hanno creato un profilo sul sito e tutte le informazioni sul loro account.</h3>
    </> :
    <>
      <h1>Users</h1>
      <h3>Here you can see everyone that created a profile on the site and all informations about their account.</h3>
    </>
}
        </div>
        
        <section className="adminPanel">
            {users.map((item) => {
                return (
                    <AdminPanelComponent
                    id = {item.id}
                    admin = {item.admin}
                    email = {item.email}
                    firstName = {item.firstName}
                    lastName = {item.lastName}
                    created = {item.createdAt}
                    street = {item.street}
                    streetNo = {item.streetNo}
                    apartNo = {item.apartNo}
                    blockNo = {item.block}
                    phoneNumber = {item.phoneNumber}
                    key = {item.id}
                    ></AdminPanelComponent>
                    )
                })}
        </section>
        </>
        }
        </>
    )
}