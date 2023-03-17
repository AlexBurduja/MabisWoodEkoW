/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from '../../publicResources/logoMabis.svg';
import { ShoppingCart } from '../cartPage/ShoppingCart';
import { CgProfile } from 'react-icons/cg' 
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FirebaseAuthContext, FirebaseContext } from '../../../FirebaseAuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ShoppingCartMobile } from '../cartPage/ShoppingCartMobile';
import ReactFlagsSelect from 'react-flags-select';
import Image from 'next/image';

export default function Header() {

  const { user, conditional } = useContext(FirebaseAuthContext)

  const [language, setLanguage] = useState("GB");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user, conditional]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const onSelect = (code) => { 
    setLanguage(code)
    localStorage.setItem('language', code)
    window.location.reload();
  }

  console.log(language)

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
        {language === "RO" ? 'Salut' :
        language === "IT" ? "Ciao" :
        language === "DE" ? "Hallo" :
        language === "FR" ? "Salut" :
        "Hi"}, {conditional.firstName}
          
          </p> 
          <button className='logoutButtonHeader' onClick={logOut}>{
          language === "RO" ? 'Delogheaza-te' 
        : language === "IT" ? "Disconnettersi"
        : language === "DE" ? 'Ausloggen'
        : language === "FR" ? 'Se déconnecter' 
        : 'Log Out'} </button>
      </div>

        </div>
      )
    } else {
      return (
        <button className='loginButtonHeader'><Link href="/login">{language === "RO" ? 'Conecteaza-te' :
        language === "IT" ? 'Accedi' :
        language === "DE" ? 'Anmelden' :
        language === "FR" ? 'Connexion' :
        'Log in'}</Link></button>
      )
    }
  }

  function LogInOrOutMobile(){
    if(user?.uid){
      return(
        <button className='logoutButtonHamburger' onClick={logOut}>{
          language === "RO" ? 'Delogheaza-te' 
        : language === "IT" ? "Disconnettersi"
        : language === "DE" ? 'Ausloggen'
        : language === "FR" ? 'Se déconnecter' 
        : 'Log Out'}</button>
      ) 
    } else {
      return(
        <button className='logoutButtonHamburger'><Link href="/login"> {language === "RO" ? 'Conectează-te' :
        language === "IT" ? 'Accedi' :
        language === "DE" ? 'Anmelden' :
        language === "FR" ? 'Connexion' :
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
  
  const router = useRouter()

  return (
    <>
    <section id="home" className='flex'>
      <div className='logo'>
        <Image src={logo} className='logo' alt="logo"/>
      </div>


    <div className='desktopAnchors'>
      <div className='nav_anchors '>
        <Link href='/' className={router.pathname === '/' ? 'activeClassNav' : ''}>
          {
          language === "RO" ? 'Acasa' :
          language === "IT" ? 'Home' :
          language === "DE" ? 'Zuhause' :
          language === "FR" ? "Accueil" : 
          'Home'}
          
        </Link>
        
        <Link className={router.pathname === '/about' ? 'activeClassNav' : ''} href='/about'>{language === "RO" ? 'Despre' :
          language === "IT" ? 'Informazioni' :
          language === "DE" ? 'Über' :
          language === "FR" ? 'À propos' :
          'About'}
        </Link>

        <Link className={router.pathname === '/reviews' ? 'activeClassNav' : ''} href='/reviews'>
        {language === "RO" ? 'Recenzii' :
          language === "IT" ? 'Recensioni' :
          language === "DE" ? 'Bewertungen' :
          language === 'FR' ? 'Commentaires' :
          'Reviews'}
        </Link>

        <Link className={router.pathname === '/contact' ? 'activeClassNav' : ''} href='/contact'>
        {language === "RO" || "FR" ? 'Contact' :
          language === "IT" ? 'Contatto' :
          language === "DE" ? 'Kontakt' :
          'Contact'}
        </Link>

        {conditional && conditional.admin  && (
          <Link className={router.pathname === '/panel' ? 'activeClassNav' : ''} href='/panel'>
            {language === "RO" ? 'Panou' :
            language === "IT" ? 'Pannello' :
            language === "DE" ? 'Panel' :
            language === 'FR' ? 'Panneau' :
            'Panel'}
          </Link>
        )}        
        </div>
    </div>

    <div className='desktopCart'> 
      <ShoppingCart/>
    </div>
      
      <LogInOrOut />

    <div className='mobileCart'>
        <ShoppingCartMobile/>  
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

          <li className="item"> <Link className={router.pathname === '/' ? 'activeClassNav' : ''} href='/'>
          {
          language === "RO" ? 'Acasa' :
          language === "IT" ? 'Home' :
          language === "DE" ? 'Zuhause' :
          language === "FR" ? "Accueil" :
          'Home'}</Link> </li>

          <li className="item"> <Link className={router.pathname === '/about' ? 'activeClassNav' : ''} href='/about'>{language === "RO" ? 'Despre' :
          language === "IT" ? 'Informazioni' :
          language === "DE" ? 'Über' :
          language === "FR" ? 'À propos' :
          'About'}</Link> </li>

          <li className="item"> <Link className={router.pathname === '/reviews' ? 'activeClassNav' : ''} href='/reviews'>{language === "RO" ? 'Recenzii' :
          language === "IT" ? 'Recensioni' :
          language === "DE" ? 'Bewertungen' :
          language === 'FR' ? 'Commentaires' :
          'Reviews'}</Link> </li>

          <li className="item"> <Link className={router.pathname === '/contact' ? 'activeClassNav' : ''} href='/contact'>{language === "RO" || "FR" ? 'Contact' :
          language === "IT" ? 'Contatto' :
          language === "DE" ? 'Kontakt' :
          'Contact'}</Link> </li>
          
          {conditional && conditional.admin === true && (
            <li className='item'><Link className={router.pathname === '/panel' ? 'activeClassNav' : ''} href='/panel'>{language === "RO" ? 'Panou' :
            language === "IT" ? 'Pannello' :
            language === "DE" ? 'Panel' :
            language === 'FR' ? 'Panneau' :
            'Panel'}</Link> </li>
            )}

          {user?.uid && (
            <li className='item'> <Link className={router.pathname === '/profile' ? 'activeClassNav' : ''} href='/profile'>
              {language === "RO" ? `Profilul lui ${conditional.firstName}` :
              language === "IT" ? `Profilo di ${conditional.firstName}` :
              language === "DE" ? `${conditional.firstName}'s Profil` :
              language === 'FR' ? `Profil d'${conditional.firstName}` :
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
