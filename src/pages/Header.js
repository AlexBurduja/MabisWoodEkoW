/* eslint-disable jsx-a11y/anchor-is-valid */
import { CgProfile } from 'react-icons/cg' 
import logo from '../publicResources/logoMabis.svg';
// import "../cartPage/ShoppingCart"
// import { ShoppingCart } from '../cartPage/ShoppingCart';
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

  const {user, conditional} = useContext(FirebaseAuthContext)

  // const [language, setLanguage] = useState(localStorage.getItem('language') || "GB");


  const onSelect = (code) => { 
    setLanguage(code)
    window.location.reload();
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
        <Link href="/profile"></Link>
        </div>

        <div className='headerLoginText'>
        <p>
            Hi, {conditional.firstName}
          
          </p> 
        <button className='logoutButtonHeader' onClick={logOut}>Delogheaza-te 
       </button>
      </div>

        </div>
      )
    } else {
      return (
        <button className='loginButtonHeader'><Link href="/login">Conecteaza-te</Link></button>
      )
    }
  }

  function LogInOrOutMobile(){
    if(user?.uid){
      return(
        <button className='logoutButtonHamburger' onClick={logOut}>
        Delogheaza-te
      </button>
      ) 
    } else {
      return(
        <button className='logoutButtonHamburger'><Link href="/login"> Conectează-te
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
        <Link className={activeClass} href='/'>Acasa
        </Link>
        
        <Link className={activeClass} href='/about'>Despre
        </Link>

        <Link className={activeClass} href='/reviews'>
          Recenzii
        </Link>

        <Link className={activeClass} href='/contact'>
          Contact
        </Link>

        {conditional.admin === true && (
          <Link className={activeClass} href='/panel'>
            Panou
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

      {/* <ReactFlagsSelect
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
      />           */}

    <div className='hamburger'>
        <input type="checkbox" id="navi-toggle" className="checkbox" />
        <label htmlFor="navi-toggle" className="button">
          <span className="icon">&nbsp;</span>
        </label>
      <div className="background">&nbsp;</div>

      <nav className="nav">
        <ul className="list">

          <li className="item"> <Link className={activeClassHamburger} href='/'>
          Acasa</Link> </li>

          <li className="item"> <Link className={activeClassHamburger} href='/about'>Despre</Link> </li>

          <li className="item"> <Link className={activeClassHamburger} href='/reviews'>Recenzii</Link> </li>

          <li className="item"> <Link className={activeClassHamburger} href='/contact'>Contact</Link> </li>
          
          {conditional.admin === true && (
            <li className='item'><Link className={activeClassHamburger} href='/panel'>Panou</Link> </li>
            )}

          {user?.uid && (
            <li className='item'> <Link className={activeClassHamburger} href='/profile'>
              Profilul lui ${conditional.firstName}
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
