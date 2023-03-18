import React, { useContext, useEffect, useState } from "react";
import { GrContactInfo } from "react-icons/gr"
import { AiOutlineCloseCircle, AiOutlineEye } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "../../../firebase-config";
import { FirebaseAuthContext } from "../../../FirebaseAuthContext";
import Loading from "../reusableComponents/Loading";

export function AdminPanelComponent(props) {

    const { id , admin , phoneNumber, street, streetNo, apartNo, blockNo, created , email , firstName , lastName  } = props


    const {user , conditional} = useContext(FirebaseAuthContext)

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [succes, setSucces] = useState('')

    const toggleModal = () => {
      setModal(!modal)
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    };
    
    const toggleEditModal = () => {
      setEditModal(!editModal)
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    };

    const toggleDeleteModal = () => {
      setDeleteModal(!deleteModal)
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    };

    const [passwordShow, setPasswordShow] = useState(false)
    const togglePassword = () => {
      setPasswordShow(!passwordShow)
    }

    function changeFirstName(event){
      setFirstName(event.target.value)
    }

    function changeLastName(event){
      setLastName(event.target.value)
    }

    function changeEmail(event){
        setNewEmail(event.target.value)
    }

    // const [email, setEmail] = useState(conditional.email)

    // console.log(conditional.email)
    
    const [ newFirstName, setFirstName] = useState(firstName)
    const [ newLastName, setLastName] = useState(lastName)
    const [ newEmail, setNewEmail ] = useState(email)


    const oonSubmit = (id) => {

        const body = {
            firstName : newFirstName,
            lastName : newLastName,
            email : newEmail,
        };
  
      const ref = doc(db, `users/${id}`)
      
      updateDoc(ref, body)

      console.log(id)

    }

    console.log(newFirstName)

    function makeAdmin( id ){
        const body = {
            admin : true
        }

        const ref = doc(db, `users/${id}`)
        
        try {
            updateDoc(ref, body)
        } catch(e) {
            console.log(e)
        }
    }

    function revokeAdmin(id){
        const body = {
            admin : false
        }

        const ref = doc(db, `users/${id}`)

        try {
            updateDoc(ref,body)
        } catch(e) {
            console.log(e)
        }
    }


    const adminDelete = async (user) => {
        const ref = doc(db, `users/${user}`)
        deleteDoc(ref)

    }


    return (
        <>
        
        <div className="userRow">
            <div className="userRowRow">
                <button onClick={toggleModal}> <GrContactInfo /> </button>
                <p> {firstName} {lastName}</p>
            </div>
        </div>
        <AnimatePresence>

        {modal && (
             <motion.div
             initial={{opacity:0}}
             animate={{opacity:1}}
             exit={{opacity:0}} 
             className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content modal-content-main">
                        <AiOutlineCloseCircle onClick={toggleModal} className="modal-content-x"/>
                        <div className="userModalHeader">
                            <h1>{firstName}&apos;s Account Info</h1>
                        </div>

                        <div className="userModalContent">
                            <div className="userModalContentAdmin">
                                <p className={admin ? 'red' : 'black'}>{
                                admin 
                                ? localStorage.getItem('language') === "FR" ? "Actuellement admin" 
                                : localStorage.getItem('language') === "RO" ? "Admin curent" 
                                : localStorage.getItem('language') === "DE" ? "Derzeitiger Admin" 
                                : localStorage.getItem('language') === "IT" ? "Attualmente amministratore" 
                                : "Currently Admin" 
                                : localStorage.getItem('language') === "FR" ? "Non admin" 
                                : localStorage.getItem('language') === "RO" ? "Nu este admin" 
                                : localStorage.getItem('language') === "DE" ? "Kein Admin" 
                                : localStorage.getItem('language') === "IT" ? "Non admin" 
                                : "Not Admin"}</p>

                                {!admin && (
                                    <div className="center makeAdmin">
                                    <button onClick={() => makeAdmin(id)}>{localStorage.getItem('language') === "FR" ? "Assigner comme admin" 
                                    : localStorage.getItem('language') === "RO" ? "Atribuie ca admin" 
                                    : localStorage.getItem('language') === "DE" ? "Als Admin zuweisen" 
                                    : localStorage.getItem('language') === "IT" ? "Assegna come admin" 
                                    : "Assign as Admin"}</button>
                                    </div>
                                )}

                                {admin && (
                                    <div className="center revokeAdmin">
                                    <button onClick={() => revokeAdmin(id)}>{localStorage.getItem('language') === "FR" ? "Révoquer l'admin" 
                                    : localStorage.getItem('language') === "RO" ? "Revoca admin" 
                                    : localStorage.getItem('language') === "DE" ? "Adminrechte entziehen" 
                                    : localStorage.getItem('language') === "IT" ? "Revoca admin" 
                                    : "Revoke Admin"}</button>
                                    </div>
                                )}
                            </div>

                            <p><span className="createdAt">{localStorage.getItem('language') === "FR" ? "Créé le" 
                            : localStorage.getItem('language') === "RO" ? "Creat in" 
                            : localStorage.getItem('language') === "DE" ? "Konto erstellt am" 
                            : localStorage.getItem('language') === "IT" ? "Account creato il" 
                            : "Account created at"} {created}</span></p>

                            {succes && (
                                <motion.p
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                exit={{opacity:0}}
                                className='stateMessage'>
                                    {succes}
                                </motion.p>
                            )}
                        <form className="adminPanelForm">
                            <div className="userModalContentEmail">
                                <p>Email</p>
                                <input defaultValue={email} onChange={changeEmail}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                            <p>{localStorage.getItem('language') === 'FR' ? 'Nom de famille' :
                                localStorage.getItem('language') === 'RO' ? 'Nume de familie' :
                                localStorage.getItem('language') === 'DE' ? 'Nachname' :
                                localStorage.getItem('language') === 'IT' ? 'Cognome' :
                                'Last name'}
                            </p>
                                <input defaultValue={lastName} onChange={changeLastName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                            <p>{localStorage.getItem('language') === 'FR' ? 'Prénom' :
                                localStorage.getItem('language') === 'RO' ? 'Prenume' :
                                localStorage.getItem('language') === 'DE' ? 'Vorname' :
                                localStorage.getItem('language') === 'IT' ? 'Nome' :
                                'First name'}
                            </p>

                                <input defaultValue={firstName} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                
                            <p>{localStorage.getItem('language') === 'FR' ? 'Numéro de téléphone' :
                                localStorage.getItem('language') === 'RO' ? 'Număr de telefon' :
                                localStorage.getItem('language') === 'DE' ? 'Telefonnummer' :
                                localStorage.getItem('language') === 'IT' ? 'Numero di telefono' :
                                'Phone number'}
                            </p>
                                <input defaultValue={phoneNumber} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                            <p>{localStorage.getItem('language') === 'FR' ? 'Rue' :
                                localStorage.getItem('language') === 'RO' ? 'Strada' :
                                localStorage.getItem('language') === 'DE' ? 'Straße' :
                                localStorage.getItem('language') === 'IT' ? 'Via' :
                                'Street'}
                            </p>
                                <input defaultValue={street} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                            <p>{localStorage.getItem('language') === 'FR' ? 'Numéro de rue' :
                                localStorage.getItem('language') === 'RO' ? 'Numărul străzii' :
                                localStorage.getItem('language') === 'DE' ? 'Hausnummer' :
                                localStorage.getItem('language') === 'IT' ? 'Numero civico' :
                                'Street No.'}
                            </p>
                                <input defaultValue={streetNo} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                
                            <p>{localStorage.getItem('language') === 'FR' ? 'Bloc' :
                                localStorage.getItem('language') === 'RO' ? 'Bloc' :
                                localStorage.getItem('language') === 'DE' ? 'Block' :
                                localStorage.getItem('language') === 'IT' ? 'Blocco' :
                                'Block'}
                            </p>
                                <input defaultValue={blockNo} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                            <p>{localStorage.getItem('language') === 'FR' ? 'Numéro d\'appartement' :
                                localStorage.getItem('language') === 'RO' ? 'Numarul apartamentului' :
                                localStorage.getItem('language') === 'DE' ? 'Wohnungsnummer' :
                                localStorage.getItem('language') === 'IT' ? 'Numero dell\'appartamento' :
                                'Apartament No.'}
                            </p>
                                <input defaultValue={apartNo} onChange={changeFirstName}></input>
                            </div>
                            
                        <div className="adminPanelButtons">
                        {localStorage.getItem('language') === 'FR' ? 
                            <>
                                <button type="button" onClick={toggleEditModal}>Modifier</button>
                                <button type="button" onClick={toggleDeleteModal}>Supprimer</button>
                            </> :
                        localStorage.getItem('language') === 'RO' ?
                            <>
                                <button type="button" onClick={toggleEditModal}>Editează</button>
                                <button type="button" onClick={toggleDeleteModal}>Șterge</button>
                            </> :
                        localStorage.getItem('language') === 'DE' ?
                            <>
                                <button type="button" onClick={toggleEditModal}>Bearbeiten</button>
                                <button type="button" onClick={toggleDeleteModal}>Löschen</button>
                            </> :
                        localStorage.getItem('language') === 'IT' ?
                            <>
                                <button type="button" onClick={toggleEditModal}>Modifica</button>
                                <button type="button" onClick={toggleDeleteModal}>Elimina</button>
                            </> :
                            <>
                                <button type="button" onClick={toggleEditModal}>Edit</button>
                                <button type="button" onClick={toggleDeleteModal}>Delete</button>
                            </>
                        }
                        </div>
                        </form>
                        </div>
                    </div>
            </motion.div>
            
        )}
        </AnimatePresence>

       
        <AnimatePresence>
    {editModal && (
         <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}} 
            className="modal">
        <div onClick={toggleEditModal} className="overlay"></div>
            <div className="modal-content">
            {localStorage.getItem('language') === 'FR' ? 
    <>
      <h1>Êtes-vous sûr ?</h1>
      <p>Vous êtes sur le point de modifier le compte de {firstName}.</p>
    </> :
 localStorage.getItem('language') === 'RO' ?
    <>
      <h1>Sunteti sigur?</h1>
      <p>Sunteti pe cale sa modificati contul lui {firstName}.</p>
    </> :
 localStorage.getItem('language') === 'DE' ?
    <>
      <h1>Sind Sie sicher?</h1>
      <p>Sie sind dabei, das Konto von {firstName} zu bearbeiten.</p>
    </> :
 localStorage.getItem('language') === 'IT' ?
    <>
      <h1>Sei sicuro?</h1>
      <p>Stai per modificare l&apos;account di {firstName}.</p>
    </> :
    <>
      <h1>Are you sure?</h1>
      <p>You are about to edit {firstName}&apos;s account.</p>
    </>
}

        <div className="adminEditModalButtons">
        {localStorage.getItem('language') === 'FR' ? 
    <>
      <button type="submit" onClick={() => oonSubmit(id)}>Confirmer</button>
      <button onClick={toggleEditModal}>Retour</button>
    </> :
 localStorage.getItem('language') === 'RO' ?
    <>
      <button type="submit" onClick={() => oonSubmit(id)}>Confirmati</button>
      <button onClick={toggleEditModal}>Inapoi</button>
    </> :
 localStorage.getItem('language') === 'DE' ?
    <>
      <button type="submit" onClick={() => oonSubmit(id)}>Bestätigen</button>
      <button onClick={toggleEditModal}>Zurück</button>
    </> :
 localStorage.getItem('language') === 'IT' ?
    <>
      <button type="submit" onClick={() => oonSubmit(id)}>Conferma</button>
      <button onClick={toggleEditModal}>Torna indietro</button>
    </> :
    <>
      <button type="submit" onClick={() => oonSubmit(id)}>Confirm</button>
      <button onClick={toggleEditModal}>Take me back</button>
    </>
}
        </div>
            </div>
            
        </motion.div>
        
        )}
    </AnimatePresence>

        <AnimatePresence>
    {deleteModal && (
         <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}} 
            className="modal">
        <div onClick={toggleDeleteModal} className="overlay"></div>
            <div className="modal-content">
            {localStorage.getItem('language') === 'FR' ? 
    <>
      <h1>Êtes-vous sûr ?</h1>
      <p>Vous êtes sur le point de supprimer définitivement le profil de {firstName}.</p>
    </> :
 localStorage.getItem('language') === 'RO' ?
    <>
      <h1>Sunteti sigur?</h1>
      <p>Sunteti pe cale sa stergeti definitiv profilul lui {firstName}.</p>
    </> :
 localStorage.getItem('language') === 'DE' ?
    <>
      <h1>Sind Sie sicher?</h1>
      <p>Sie sind dabei, das Profil von {firstName} dauerhaft zu löschen.</p>
    </> :
 localStorage.getItem('language') === 'IT' ?
    <>
      <h1>Sei sicuro?</h1>
      <p>Stai per eliminare definitivamente il profilo di {firstName}.</p>
    </> :
    <>
      <h1>Are you sure?</h1>
      <p>You are about to permanently delete {firstName}&apos;s profile.</p>
    </>
}
            
            <div className="adminEditModalButtons">
                <div>
            <button type="submit" onClick={adminDelete}>Delete</button>
                </div>

                <div>
            <button onClick={toggleDeleteModal}>Take me back</button>
                </div>
            </div>
        </div>
            
        </motion.div>
        
        )}
    </AnimatePresence>

        </>

)

}