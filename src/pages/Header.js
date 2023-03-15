/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from '../publicResources/logoMabis.svg';
// import "../cartPage/ShoppingCart"
// import { ShoppingCart } from '../cartPage/ShoppingCart';
import { CgProfile } from 'react-icons/cg' 
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FirebaseAuthContext, FirebaseContext } from '../../FirebaseAuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { ShoppingCartMobile } from '../cartPage/ShoppingCartMobile';
import ReactFlagsSelect from 'react-flags-select';
import Image from 'next/image';

export default function Header() {

  const { user, conditional } = useContext(FirebaseAuthContext)
  
  const [language, setLanguage] = useState("GB");

   useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, []);

  const onSelect = (code) => { 
    setLanguage(code)
    localStorage.setItem('language', code)
  }

  const logOut = async () => {
    await signOut(auth)

    window.location.reload()
  }

  // console.log(language)
 
  function LogInOrOut() {
    if (user?.uid){
      return (
        <div className='headerLogin'>
      <div className='headerLoginIcons'>
        <Link href="/profile"> <CgProfile /> </Link>
        </div>

        <div className='headerLoginText'>
        <p>
        {localStorage.getItem('language') === "RO" ? 'Salut' :
        localStorage.getItem('language') === "IT" ? "Ciao" :
        localStorage.getItem('language') === "DE" ? "Hallo" :
        localStorage.getItem('language') === "FR" ? "Salut" :
        "Hi"}, {conditional.firstName}
          
          </p> 
          <button className='logoutButtonHeader' onClick={logOut}>{
          localStorage.getItem('language') === "RO" ? 'Delogheaza-te' 
        : localStorage.getItem('language') === "IT" ? "Disconnettersi"
        : localStorage.getItem('language') === "DE" ? 'Ausloggen'
        : localStorage.getItem('language') === "FR" ? 'Se déconnecter' 
        : 'Log Out'} </button>
      </div>

        </div>
      )
    } else {
      return (
        <button className='loginButtonHeader'><Link href="/login">{localStorage.getItem('language') === "RO" ? 'Conecteaza-te' :
        localStorage.getItem('language') === "IT" ? 'Accedi' :
        localStorage.getItem('language') === "DE" ? 'Anmelden' :
        localStorage.getItem('language') === "FR" ? 'Connexion' :
        'Log in'}</Link></button>
      )
    }
  }

  function LogInOrOutMobile(){
    if(user?.uid){
      return(
        <button className='logoutButtonHamburger' onClick={logOut}>{
          localStorage.getItem('language') === "RO" ? 'Delogheaza-te' 
        : localStorage.getItem('language') === "IT" ? "Disconnettersi"
        : localStorage.getItem('language') === "DE" ? 'Ausloggen'
        : localStorage.getItem('language') === "FR" ? 'Se déconnecter' 
        : 'Log Out'}</button>
      ) 
    } else {
      return(
        <button className='logoutButtonHamburger'><Link href="/login"> {localStorage.getItem('language') === "RO" ? 'Conectează-te' :
        localStorage.getItem('language') === "IT" ? 'Accedi' :
        localStorage.getItem('language') === "DE" ? 'Anmelden' :
        localStorage.getItem('language') === "FR" ? 'Connexion' :
        'Log in'}
         </Link></button>
      )
      }
    }


  const activeClass = ({isActive}) => isActive ? "activeClassNav" : {};

  const activeClassHamburger = ({isActiveHamburger}) => isActiveHamburger ? "activeClassHamburger" : "link";

  useEffect(() => {
      const checkbox = document.querySelector('#navi-toggle');
      const body = document.querySelector('body');

      const handleCheckboxClick = () => {
        if (checkbox.checked) {
          body.classList.add('no-scroll');
        } else {
          body.classList.remove('no-scroll');
        }
      };

      const handleNavLinkClick = () => {
        body.classList.remove('no-scroll');
      };

      checkbox.addEventListener('click', handleCheckboxClick);
      document.querySelectorAll('.item a').forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
      });

      return () => {
        checkbox.removeEventListener('click', handleCheckboxClick);
        document.querySelectorAll('.item a').forEach(link => {
          link.removeEventListener('click', handleNavLinkClick);
        });
      };
  }, []);
  

  return (
    <>
    <section id="home" className='flex'>
      <div className='logo'>
        <Image src={logo} className='logo' alt="logo"/>
      </div>


    <div className='desktopAnchors'>
      <div className='nav_anchors '>
        <Link className={activeClass} href='/'>{
          localStorage.getItem('language') === "RO" ? 'Acasa' :
          localStorage.getItem('language') === "IT" ? 'Home' :
          localStorage.getItem('language') === "DE" ? 'Zuhause' :
          localStorage.getItem('language') === "FR" ? "Accueil" : 
          'Home'}
        </Link>
        
        <Link className={activeClass} href='/about'>{localStorage.getItem('language') === "RO" ? 'Despre' :
          localStorage.getItem('language') === "IT" ? 'Informazioni' :
          localStorage.getItem('language') === "DE" ? 'Über' :
          localStorage.getItem('language') === "FR" ? 'À propos' :
          'About'}
        </Link>

        <Link className={activeClass} href='/reviews'>
        {localStorage.getItem('language') === "RO" ? 'Recenzii' :
          localStorage.getItem('language') === "IT" ? 'Recensioni' :
          localStorage.getItem('language') === "DE" ? 'Bewertungen' :
          localStorage.getItem('language') === 'FR' ? 'Commentaires' :
          'Reviews'}
        </Link>

        <Link className={activeClass} href='/contact'>
        {localStorage.getItem('language') === "RO" || "FR" ? 'Contact' :
          localStorage.getItem('language') === "IT" ? 'Contatto' :
          localStorage.getItem('language') === "DE" ? 'Kontakt' :
          'Contact'}
        </Link>

        {conditional.admin === true && (
          <Link className={activeClass} href='/panel'>
            {localStorage.getItem('language') === "RO" ? 'Panou' :
            localStorage.getItem('language') === "IT" ? 'Pannello' :
            localStorage.getItem('language') === "DE" ? 'Panel' :
            localStorage.getItem('language') === 'FR' ? 'Panneau' :
            'Panel'}
          </Link>
        )}        
        </div>
    </div>

    <div className='desktopCart'> 
      {/* <ShoppingCart/> */}
    </div>
      
      <LogInOrOut />

    <div className='mobileCart'>
        {/* <ShoppingCartMobile/>   */}
      </div>

      <ReactFlagsSelect
                  selected={language}
                  onSelect={onSelect}
                  countries={["RO", "GB", "IT", "DE", "FR"]}
                  fullWidth={true}
                  showOptionLabel={false}
                  showSelectedLabel={false}
                  showSecondaryOptionLabel={false}
                  placeholder = "S"
                  className='custom-flags-select'
                  customLabels={{ RO: "Romanian", GB: 'English'}}
      />          

    <div className='hamburger'>
        <input type="checkbox" id="navi-toggle" className="checkbox" />
        <label htmlFor="navi-toggle" className="button">
          <span className="icon">&nbsp;</span>
        </label>
      <div className="background">&nbsp;</div>

      <nav className="nav">
        <ul className="list">

          <li className="item"> <Link className={activeClassHamburger} href='/'>
          {
          localStorage.getItem('language') === "RO" ? 'Acasa' :
          localStorage.getItem('language') === "IT" ? 'Home' :
          localStorage.getItem('language') === "DE" ? 'Zuhause' :
          localStorage.getItem('language') === "FR" ? "Accueil" :
          'Home'}</Link> </li>

          <li className="item"> <Link className={activeClassHamburger} href='/about'>{localStorage.getItem('language') === "RO" ? 'Despre' :
          localStorage.getItem('language') === "IT" ? 'Informazioni' :
          localStorage.getItem('language') === "DE" ? 'Über' :
          localStorage.getItem('language') === "FR" ? 'À propos' :
          'About'}</Link> </li>

          <li className="item"> <Link className={activeClassHamburger} href='/reviews'>{localStorage.getItem('language') === "RO" ? 'Recenzii' :
          localStorage.getItem('language') === "IT" ? 'Recensioni' :
          localStorage.getItem('language') === "DE" ? 'Bewertungen' :
          localStorage.getItem('language') === 'FR' ? 'Commentaires' :
          'Reviews'}</Link> </li>

          <li className="item"> <Link className={activeClassHamburger} href='/contact'>{localStorage.getItem('language') === "RO" || "FR" ? 'Contact' :
          localStorage.getItem('language') === "IT" ? 'Contatto' :
          localStorage.getItem('language') === "DE" ? 'Kontakt' :
          'Contact'}</Link> </li>
          
          {conditional.admin === true && (
            <li className='item'><Link className={activeClassHamburger} href='/panel'>{localStorage.getItem('language') === "RO" ? 'Panou' :
            localStorage.getItem('language') === "IT" ? 'Pannello' :
            localStorage.getItem('language') === "DE" ? 'Panel' :
            localStorage.getItem('language') === 'FR' ? 'Panneau' :
            'Panel'}</Link> </li>
            )}

          {user?.uid && (
            <li className='item'> <Link className={activeClassHamburger} href='/profile'>
              {localStorage.getItem('language') === "RO" ? `Profilul lui ${conditional.firstName}` :
              localStorage.getItem('language') === "IT" ? `Profilo di ${conditional.firstName}` :
              localStorage.getItem('language') === "DE" ? `${conditional.firstName}'s Profil` :
              localStorage.getItem('language') === 'FR' ? `Profil d'${conditional.firstName}` :
              `${conditional.firstName}'s Profile`}
              </Link> </li>
          )}
     
          <LogInOrOutMobile/>
        </ul>
      </nav>
</div>  
      
  </section>
  </>
  );
}
